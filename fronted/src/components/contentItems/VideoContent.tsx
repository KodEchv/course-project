import { useMemo } from "react";

export const VideoContent = ({ src, title }: { src: string; title: string }) => {
  const embedSrc = useMemo(() => {
    if (!src) return "";
    try {
      // if youtube watch link -> convert to embed
      if (src.includes("watch?v=")) return src.replace("watch?v=", "embed/");
      return src;
    } catch {
      return src;
    }
  }, [src]);

  return (
    <div className="my-6 w-full flex justify-center">
      <div className="w-full max-w-3xl bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</div>
        </div>
        <div className="p-4 flex justify-center">
          {embedSrc ? (
            <div className="w-full aspect-video rounded-md overflow-hidden">
              <iframe
                src={embedSrc}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-sm text-slate-600">
              Video no disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
