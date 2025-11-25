import { useState } from "react";

export const ImgContent = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="my-6 w-full flex justify-center">
      <div className="w-full max-w-3xl bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-center p-4 bg-gradient-to-r from-slate-50 to-slate-100">
          {!loaded && !error && (
            <div className="animate-pulse w-full h-64 bg-gray-200 rounded-md" />
          )}

          {error && (
            <div className="w-full h-64 flex items-center justify-center text-sm text-red-500">
              Imagen no disponible
            </div>
          )}

          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-auto max-h-[32rem] object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        {alt && (
          <div className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 bg-white/60">
            {alt}
          </div>
        )}
      </div>
    </div>
  );
};
