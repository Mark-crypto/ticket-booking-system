import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { photos, photoSrc, type PhotoKey } from "@/data/photos"

type Width = 640 | 1280 | 1920

interface PhotoProps extends Omit<ComponentProps<"img">, "src" | "srcSet" | "alt"> {
  photo: PhotoKey
  /** How wide the image renders, so the browser picks the right file. */
  sizes?: string
  /** Which files exist for this photo. 1920 only exists for hero images. */
  widths?: Width[]
  /** Use for above-the-fold images (hero) so they load immediately. */
  priority?: boolean
  /** Override the default alt text (use "" for purely decorative images). */
  alt?: string
}

// Responsive, lazy-loaded photo: phones download the 640px file,
// bigger screens the larger ones.
export function Photo({
  photo,
  sizes = "100vw",
  widths = [640, 1280],
  priority,
  alt,
  className,
  ...props
}: PhotoProps) {
  return (
    <img
      src={photoSrc(photo, widths.includes(1280) ? 1280 : widths[0])}
      srcSet={widths.map((w) => `${photoSrc(photo, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt ?? photos[photo].alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className={cn("object-cover select-none", className)}
      {...props}
    />
  )
}
