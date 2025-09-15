type ModuleCardProps = {
    imageUrl?: string;
    moduleName: string;
};

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6ArxNj2-EdfQ3AM27v-FqOJKnpbSiNo6Kw&s";

export const ModuleCard = ({ imageUrl, moduleName }: ModuleCardProps) => {
    return (
        <div className="w-full h-full rounded-xl bg-[#d9d9d9] flex flex-col p-2 shadow-md">
            {/* Imagen proporcional */}
            <div className="flex-1 flex items-center justify-center">
                <img
                    src={imageUrl || DEFAULT_IMAGE}
                    alt="Module Thumbnail"
                    className="max-w-[80%] max-h-[95%] object-contain rounded-lg"
                />
            </div>
            <h3 className="text-center text-sm md:text-base font-bold mt-2">
                {moduleName}
            </h3>
        </div>
    );
};
