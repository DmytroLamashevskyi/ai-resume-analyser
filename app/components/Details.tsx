import React, { useState } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ScoreBadge from './ScoreBadge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DetailTip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

interface CategoryData {
    score: number;
    tips: DetailTip[];
}

const TipCard = ({ tip, explanation, type }: { tip: string; explanation: string; type: "good" | "improve" }) => {
    const isGood = type === 'good';
    return (
        <div className={cn(
            "flex flex-col gap-2 p-3 rounded-lg border text-sm transition-colors bg-white",
            isGood ? "border-green-100" : "border-red-100"
        )}>
            <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                    {isGood ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <span className={cn("font-medium", isGood ? "text-green-900" : "text-red-900")}>
                        {tip}
                    </span>
                    <p className={cn("text-xs leading-relaxed", isGood ? "text-green-700" : "text-red-700")}>
                        {explanation}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CategorySection = ({ title, data, icon }: { title: string; data: CategoryData; icon: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const goodTips = data.tips.filter(t => t.type === 'good');
    const improveTips = data.tips.filter(t => t.type === 'improve');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        {icon}
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            {goodTips.length} strengths, {improveTips.length} improvements
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-xl font-bold text-gray-900">{data.score}/100</span>
                    </div>
                    <ScoreBadge score={data.score} />
                    <svg
                        className={cn("w-5 h-5 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden bg-gray-50/50 border-t border-gray-100">
                    <div className="p-6 flex flex-col gap-6">
                        {/* Good Points */}
                        <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50">
                            <h4 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2 pb-2 border-b border-green-200/50">
                                <span className="p-1.5 bg-green-200 rounded-md text-green-700">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                Strengths
                            </h4>
                            <div className="space-y-3">
                                {goodTips.length > 0 ? (
                                    goodTips.map((tip, idx) => (
                                        <TipCard key={idx} tip={tip.tip} explanation={tip.explanation} type="good" />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 italic pl-1">No specific strengths highlighted.</p>
                                )}
                            </div>
                        </div>

                        {/* Improvements */}
                        <div className="bg-red-50/50 rounded-xl p-4 border border-red-100/50">
                            <h4 className="text-base font-bold text-red-900 mb-4 flex items-center gap-2 pb-2 border-b border-red-200/50">
                                <span className="p-1.5 bg-red-200 rounded-md text-red-700">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                                Areas for Improvement
                            </h4>
                            <div className="space-y-3">
                                {improveTips.length > 0 ? (
                                    improveTips.map((tip, idx) => (
                                        <TipCard key={idx} tip={tip.tip} explanation={tip.explanation} type="improve" />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 italic pl-1">No critical improvements needed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 px-1">Detailed Analysis</h2>

            <CategorySection
                title="Tone & Style"
                data={feedback.toneAndStyle}
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                }
            />

            <CategorySection
                title="Content Impact"
                data={feedback.content}
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                }
            />

            <CategorySection
                title="Structure & Formatting"
                data={feedback.structure}
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                }
            />

            <CategorySection
                title="Skills Analysis"
                data={feedback.skills}
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
            />
        </div>
    );
}

export default Details;