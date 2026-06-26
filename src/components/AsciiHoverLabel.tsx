"use client";

import { useState, useCallback, useRef } from "react";

const SCRAMBLE = ["+", ".", "·", ":", "+", ".", "+", "·"];
const FRAMES = 10;
const MS = 36;

export type RenderLetterFn = (
  char: string,
  index: number,
  plainOpacity: number
) => React.ReactNode;

interface AsciiHoverLabelProps {
  label: string;
  hideCursor?: boolean;
  measureClassName?: string;
  measureStyle?: React.CSSProperties;
  renderLetter?: RenderLetterFn;
  className?: string;
}

export default function AsciiHoverLabel({
  label,
  hideCursor = false,
  measureClassName = "",
  measureStyle,
  renderLetter,
  className = "",
}: AsciiHoverLabelProps) {
  const chars = label.split("");
  const [displays, setDisplays] = useState<string[]>(chars);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scramble = useCallback(
    (index: number, original: string) => {
      if (original === " ") return;
      let frame = 0;
      const tick = () => {
        setDisplays((prev) => {
          const next = [...prev];
          next[index] =
            frame < FRAMES
              ? SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
              : original;
          return next;
        });
        if (frame < FRAMES) {
          frame++;
          timers.current.push(setTimeout(tick, MS));
        }
      };
      tick();
    },
    []
  );

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplays(label.split(""));
  }, [label]);

  return (
    <span
      className={`inline-flex flex-nowrap whitespace-pre ${hideCursor ? "cursor-none" : ""} ${className}`}
      onMouseLeave={reset}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className={measureClassName}
          style={measureStyle}
          onMouseEnter={() => scramble(i, char)}
        >
          {renderLetter
            ? renderLetter(displays[i], i, 1)
            : displays[i] === " "
            ? " "
            : displays[i]}
        </span>
      ))}
    </span>
  );
}
