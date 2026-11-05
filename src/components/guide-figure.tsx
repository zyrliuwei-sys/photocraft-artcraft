export function GuideFigure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="border-border h-auto w-full rounded-[var(--radius)] border"
      />
      <figcaption className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
