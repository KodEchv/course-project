export const VideoContent = ({ src, title }: { src: string, title: string }) => {
  return (
    <div className="my-4 flex flex-col items-center gap-2">
      <div className="text-lg font-medium">{title}</div>
      <iframe
        src={src.replace("watch?v=", "embed/")}
        className="max-w-1/2 h-64 rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
