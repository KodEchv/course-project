type ModuleCardProps = {
    imageUrl?: string;
    moduleName: string;
};
const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6ArxNj2-EdfQ3AM27v-FqOJKnpbSiNo6Kw&s";

export const ModuleCard = ({ imageUrl, moduleName }: ModuleCardProps) => {
    return (
        <div className="w-[250px] h-[250px] rounded-[20px] bg-[#d9d9d9]">
            <div className="w-[200px] h-[200px] mx-auto py-4">
                <img
                    src={imageUrl || DEFAULT_IMAGE}
                    alt="Module Thumbnail"
                    className="w-full h-full object-cover rounded-[10px]"
                />
            </div>
            <div className="nombreModulo">
                <h3 className="text-center text-xl font-bold">{moduleName}</h3>
            </div>
        </div>
    );
};
