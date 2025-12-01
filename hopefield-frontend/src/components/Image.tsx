// src/components/Image.tsx
import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  className?: string; // optional Tailwind or custom CSS classes
  width?: number | string; // optional width
  height?: number | string; // optional height
};

export default function Image({ src, alt, className = "", width, height }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      loading="lazy" // lazy loading for performance
    />
  );
}
