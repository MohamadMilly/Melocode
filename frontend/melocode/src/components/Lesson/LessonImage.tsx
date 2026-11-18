export function LessonImage(props: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`${props.className ?? ""} max-w-2xl my-4 mx-auto w-full h-auto border rounded-md overflow-hidden border-[var(--accent-7)] shadow-[var(--accent-6)] shadow-xl `}
    >
      <img
        loading="lazy"
        className="mx-auto w-auto h-auto object-contain object-center"
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
}
