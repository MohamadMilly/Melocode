export function LessonImage(props: { src: string; alt: string }) {
  return (
    <div className="max-w-2xl mx-auto w-full h-auto border rounded-md overflow-hidden border-[var(--accent-7)] shadow-[var(--accent-6)] shadow-xl ">
      <img
        className="mx-auto w-auto h-auto object-contain object-center"
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
}
