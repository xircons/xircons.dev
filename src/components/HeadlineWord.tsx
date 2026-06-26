"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export default function HeadlineWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], ["0.9em", "0em"]);
  const rotateX = useTransform(progress, [start, end], [-65, 0]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        style={{ opacity, y, rotateX, transformOrigin: "bottom center" }}
        className="inline-block will-change-transform"
      >
        {word}
        <span>&nbsp;</span>
      </motion.span>
    </span>
  );
}
