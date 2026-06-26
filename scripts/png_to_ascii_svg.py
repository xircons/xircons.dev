#!/usr/bin/env python3
"""
Convert a transparent PNG logo into an ASCII-art SVG.

Two modes:
  default  -- SVG has the same viewBox/width/height as the input PNG so the two
              images can be stacked for a CSS hover swap effect.
  --crop   -- SVG viewBox is trimmed to the content bounding box so the ASCII
              fills the display area at any container size (characters are legible
              even when the container is much smaller than the source resolution).

Usage:
    python scripts/png_to_ascii_svg.py public/logo/xircons-full-nobg.png \\
        --output public/logo/xircons-ascii-nobg.svg \\
        --color "#1A1A1A" \\
        --cell-height 25 \\
        --crop

Dependencies:
    pip install pillow
"""

from __future__ import annotations

import argparse
import sys
from html import escape
from pathlib import Path

from PIL import Image


def pick_glyph(ratio: float, ramp: str, fill_threshold: float) -> str:
    if ratio < fill_threshold:
        return " "
    span = 1.0 - fill_threshold
    norm = 0.0 if span <= 0 else (ratio - fill_threshold) / span
    norm = max(0.0, min(1.0, norm))
    last = len(ramp) - 1
    idx = min(last, int(round(norm * last)))
    return ramp[idx]


def sample_grid(
    img: Image.Image,
    cell_w: float,
    cell_h: float,
    alpha_threshold: int,
    fill_threshold: float,
    ramp: str,
) -> list[str]:
    width, height = img.size
    cols = max(1, round(width / cell_w))
    rows = max(1, round(height / cell_h))
    pixels = img.load()

    rows_out: list[str] = []
    for r in range(rows):
        y0 = int(round(r * height / rows))
        y1 = max(y0 + 1, int(round((r + 1) * height / rows)))
        line_chars: list[str] = []
        for c in range(cols):
            x0 = int(round(c * width / cols))
            x1 = max(x0 + 1, int(round((c + 1) * width / cols)))
            opaque = 0
            total = 0
            for y in range(y0, y1):
                for x in range(x0, x1):
                    p = pixels[x, y]
                    if p[3] >= alpha_threshold and sum(p[:3]) < 300:
                        opaque += 1
                    total += 1
            ratio = opaque / total if total else 0.0
            line_chars.append(pick_glyph(ratio, ramp, fill_threshold))
        rows_out.append("".join(line_chars))
    return rows_out


def content_bbox(grid: list[str]) -> tuple[int, int, int, int]:
    """Return (first_row, last_row, first_col, last_col) of non-empty cells."""
    first_row = last_row = first_col = last_col = -1
    for r, line in enumerate(grid):
        for c, ch in enumerate(line):
            if ch != " ":
                if first_row == -1:
                    first_row = r
                last_row = r
                if first_col == -1 or c < first_col:
                    first_col = c
                if c > last_col:
                    last_col = c
    return first_row, last_row, first_col, last_col


def build_svg(
    grid: list[str],
    img_width: int,
    img_height: int,
    cell_w: float,
    cell_h: float,
    color: str,
    font_family: str,
    crop: bool,
) -> str:
    cols = len(grid[0]) if grid else 0

    if crop:
        dot_counts = [sum(1 for ch in row if ch != " ") for row in grid]
        peak = max(dot_counts) if dot_counts else 1
        noise_threshold = peak * 0.08
        cleaned = [
            row if dot_counts[i] >= noise_threshold else " " * len(row)
            for i, row in enumerate(grid)
        ]
        grid = cleaned

        r0, r1, c0, c1 = content_bbox(grid)
        if r0 == -1:
            r0, r1, c0, c1 = 0, len(grid) - 1, 0, cols - 1
        pad_rows = 1
        pad_cols = 2
        r0 = max(0, r0 - pad_rows)
        r1 = min(len(grid) - 1, r1 + pad_rows)
        c0 = max(0, c0 - pad_cols)
        c1 = min(cols - 1, c1 + pad_cols)

        visible_cols = c1 - c0 + 1
        vb_x = 0.0
        vb_y = 0.0
        vb_w = visible_cols * cell_w
        vb_h = (r1 - r0 + 1) * cell_h
        row_slice = (c0, c1 + 1)
        row_range = range(r0, r1 + 1)
    else:
        vb_x, vb_y, vb_w, vb_h = 0.0, 0.0, float(img_width), float(img_height)
        row_slice = (0, cols)
        row_range = range(len(grid))

    row_text_width = (row_slice[1] - row_slice[0]) * cell_w

    parts: list[str] = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{vb_x:.4f} {vb_y:.4f} {vb_w:.4f} {vb_h:.4f}" '
        f'width="{vb_w:.0f}" height="{vb_h:.0f}" '
        f'preserveAspectRatio="xMidYMid slice" '
        f'shape-rendering="crispEdges">'
    )
    parts.append(
        f'<style>text{{font-family:{font_family};font-weight:bold;font-size:{cell_h:.4f}px;'
        f'fill:{color};white-space:pre;dominant-baseline:hanging;}}</style>'
    )

    for r in row_range:
        line = grid[r][row_slice[0]:row_slice[1]]
        if not line.strip():
            continue
        y = (r - (row_range.start if crop else 0)) * cell_h
        safe = escape(line, quote=False)
        parts.append(
            f'<text x="0" y="{y:.4f}" '
            f'textLength="{row_text_width:.4f}" '
            f'lengthAdjust="spacingAndGlyphs" '
            f'xml:space="preserve">{safe}</text>'
        )
    parts.append("</svg>")
    return "\n".join(parts)


def convert(
    input_path: Path,
    output_path: Path,
    cell_height: float,
    char_aspect: float,
    color: str,
    font_family: str,
    ramp: str,
    alpha_threshold: int,
    fill_threshold: float,
    crop: bool,
) -> None:
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    cell_w = cell_height * char_aspect

    grid = sample_grid(img, cell_w, cell_height, alpha_threshold, fill_threshold, ramp)
    svg = build_svg(grid, width, height, cell_w, cell_height, color, font_family, crop)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(svg, encoding="utf-8")

    cols = len(grid[0]) if grid else 0
    rows = len(grid)
    print(
        f"Wrote {output_path}\n"
        f"  source: {input_path} ({width}x{height})\n"
        f"  grid:   {cols} cols x {rows} rows (cell {cell_w:.2f}x{cell_height:.2f})\n"
        f"  color:  {color}\n"
        f"  crop:   {crop}"
    )


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert transparent PNG logo to ASCII-art SVG overlay."
    )
    parser.add_argument("input", type=Path, help="Path to source PNG (RGBA).")
    parser.add_argument(
        "--output", "-o", type=Path, default=None,
        help="Output SVG path. Defaults to <input-stem>-ascii.svg next to the input.",
    )
    parser.add_argument(
        "--cell-height", type=float, default=14.0,
        help="Vertical pixel size of one ASCII cell. Smaller = denser (default: 14).",
    )
    parser.add_argument(
        "--char-aspect", type=float, default=0.6,
        help="Monospace char width/height ratio (default: 0.6).",
    )
    parser.add_argument(
        "--color", default="#E0E6ED",
        help="Fill color for ASCII characters (default: #E0E6ED).",
    )
    parser.add_argument(
        "--font", default="'Fira Code','Courier New',ui-monospace,monospace",
        help="CSS font-family stack used in the SVG.",
    )
    parser.add_argument(
        "--ramp", default=".:+#",
        help="ASCII density ramp from sparse to dense, e.g. '.:+#'. "
        "Each cell picks a glyph based on opaque-pixel ratio.",
    )
    parser.add_argument(
        "--char", default=None,
        help="Single glyph to use for every filled cell. Overrides --ramp.",
    )
    parser.add_argument(
        "--alpha-threshold", type=int, default=128,
        help="Per-pixel alpha to count as opaque (0-255, default: 128).",
    )
    parser.add_argument(
        "--fill-threshold", type=float, default=0.4,
        help="Opaque fraction in a cell required to draw a glyph (default: 0.4).",
    )
    parser.add_argument(
        "--crop", action="store_true",
        help="Trim SVG viewBox to the content bounding box so it fills any container.",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    output = args.output
    if output is None:
        output = args.input.with_name(f"{args.input.stem}-ascii.svg")
    ramp = args.char if args.char else args.ramp
    if not ramp:
        ramp = "#"
    convert(
        input_path=args.input,
        output_path=output,
        cell_height=args.cell_height,
        char_aspect=args.char_aspect,
        color=args.color,
        font_family=args.font,
        ramp=ramp,
        alpha_threshold=args.alpha_threshold,
        fill_threshold=args.fill_threshold,
        crop=args.crop,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
