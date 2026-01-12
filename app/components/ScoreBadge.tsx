import React from "react";

type ScoreBadgeProps = {
    score: number;
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const variant =
        score > 70
            ? {
                label: "Strong",
                container: "bg-green-100 border border-green-200",
                text: "text-green-700",
            }
            : score > 49
                ? {
                    label: "Good Start",
                    container: "bg-yellow-100 border border-yellow-200",
                    text: "text-yellow-700",
                }
                : {
                    label: "Needs Work",
                    container: "bg-red-100 border border-red-200",
                    text: "text-red-700",
                };

    return (
        <div className={`inline-flex items-center rounded-full px-3 py-1 ${variant.container}`}>
            <p className={`text-sm font-semibold ${variant.text}`}>
                {variant.label}
            </p>
        </div>
    );
};

export default ScoreBadge;
