// src/components/AppImage.tsx
import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function AppImage({ src, alt, className = "", width, height }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
