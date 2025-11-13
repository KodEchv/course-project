import React from "react";

interface BarProps {
    label: string;
    value: number;
    max: number;
    color?: string;
}

const Bar: React.FC<BarProps> = ({ label, value, max, color }) => {
    const percent = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="mb-2">
            <div className="flex justify-between mb-1">
                <span className="text-xs text-[#2e2e2e]">{label}</span>
                <span className="text-xs text-[#2e2e2e]">{value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-3">
                <div
                    className="h-3 rounded"
                    style={{ width: `${percent}%`, background: color || '#2563eb' }}
                ></div>
            </div>
        </div>
    );
};

export default Bar;
