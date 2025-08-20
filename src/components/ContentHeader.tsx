import { CircleArrowLeft, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

export const ContentHeader = ({ modulo }: { modulo: string }) => (
    <div className="flex items-center justify-between w-full px-6 py-4">
        <div className="flex items-center gap-4">
            <Link to="/modulos">
                <CircleArrowLeft size={50} className="text-[#d9d9d9] hover:text-[#2e2e2e]" />
            </Link>
            <span className="text-3xl text-[#d9d9d9] font-normal tracking-wide">VISTA - {modulo}</span>
        </div>
        <Volume2 size={45} className="text-[#d9d9d9] hover:text-[#2e2e2e] hover:cursor-pointer" />
    </div>
);
