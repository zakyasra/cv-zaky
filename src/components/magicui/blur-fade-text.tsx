"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  isTitle?: boolean;
}
const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  isTitle = false
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" }
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <div className="flex">
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Infinity,
                delay: delay + i * characterDelay,
                ease: "easeOut"
              }}
              className={cn("inline-block", className)}
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex">
      <AnimatePresence>
        {isTitle && (
          <motion.span
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={combinedVariants}
            transition={{
              yoyo: Infinity,
              delay,
              ease: "easeOut"
            }}
            className={cn("inline-block", className)}
          >
            <div className="flex gap-1 md:gap-2">
              {text}
              <Image
                src="/verified.svg"
                alt="Verified"
                loading="lazy"
                quality={100}
                width={64}
                height={64}
                className="size-5 md:size-7 self-center"
              />
            </div>
          </motion.span>
        )}
        {!isTitle && (
          <motion.span
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={combinedVariants}
            transition={{
              yoyo: Infinity,
              delay,
              ease: "easeOut"
            }}
            className={cn("inline-block", className)}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlurFadeText;
