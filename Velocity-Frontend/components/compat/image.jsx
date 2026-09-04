import React from "react"

export default function Image({ src, alt = "", fill, priority: _priority, sizes, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${fill ? "absolute inset-0 h-full w-full" : ""} ${className}`.trim()}
      sizes={sizes}
      {...props}
    />
  )
}
