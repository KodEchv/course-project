import React from "react";

interface StatCardProps {
    title: string;
    value: number | string;
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, className }) => (
    <div className={`bg-white rounded-xl shadow p-6 flex flex-col items-center min-w-[140px] ${className || ''}`}>
        <span className="text-2xl font-bold text-[#2e2e2e]">{value}</span>
        <span className="text-[#2e2e2e] text-sm mt-2 text-center">{title}</span>
    </div>
);

export default StatCard;
