
import { ContentHeader } from "../components/ContentHeader";
import { SubmodulesList } from "../components/SubmodulesList";
import { ContentSection } from "../components/ContentSection";
import { ContentBox } from "../components/ContentBox";

const submodules = [
  "1.1 Introducción al módulo",
  "1.2 Introducción al módulo"
];

export const ContentView = () => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <ContentHeader modulo="MODULO 1" />
      <div className="flex flex-1 gap-6 mt-2">
        <div className="flex flex-col flex-1">
          <ContentBox />
          <ContentSection title="1.1 INTRODUCCION AL MODULO" />
        </div>
        <SubmodulesList submodules={submodules} />
      </div>
    </div>
  );
}
