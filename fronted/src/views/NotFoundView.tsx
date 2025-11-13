import { Link } from "react-router-dom";

const NotFoundView = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0D1B2A] instrument-sans">
            <div className="bg-[#D9D9D9] rounded-[50px] shadow-lg p-12 flex flex-col items-center">
                <h1 className="text-5xl font-bold text-[#2e2e2e] mb-4">404</h1>
                <h2 className="text-2xl text-[#2e2e2e] mb-6">Página no encontrada</h2>
                <p className="text-[#2e2e2e] mb-8">La página que buscas no existe o fue movida.</p>
                <Link to="/" className="px-6 py-2 rounded bg-blue-600 text-white text-lg hover:bg-blue-700 transition-colors">Volver al inicio</Link>
            </div>
        </div>
    );
};

export default NotFoundView;
