import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ScoreBadge from './ScoreBadge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ATSTip {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: ATSTip[];
}

const ATSTipCard = ({ tip, type }: { tip: string; type: "good" | "improve" }) => {
    const isGood = type === 'good';
    return (
        <div className={cn(
            "flex gap-3 p-3 rounded-lg border text-sm",
            isGood ? "bg-green-50 border-green-100 text-green-900" : "bg-red-50 border-red-100 text-red-900"
        )}>
            <div className="shrink-0 mt-0.5">
                {isGood ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )}
            </div>
            <span className="leading-relaxed">{tip}</span>
        </div>
    );
};

const ATS = ({ score, suggestions }: ATSProps) => {
    const goodTips = suggestions.filter(s => s.type === 'good');
    const improveTips = suggestions.filter(s => s.type === 'improve');

    return (
        <div className="bg-linear-to-br from-indigo-50/40 via-purple-50/40 to-pink-50/40 rounded-2xl shadow-md w-full overflow-hidden border border-indigo-100/20">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ATS Compatibility
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Analysis of how well Applicant Tracking Systems can parse your resume.
                        </p>
                    </div>
                    <ScoreBadge score={score} />
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Good Points Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-green-100 rounded-md">
                            <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900">Passing Checks</h3>
                        <span className="ml-auto text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {goodTips.length}
                        </span>
                    </div>
                    {goodTips.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {goodTips.map((tip, idx) => (
                                <ATSTipCard key={idx} tip={tip.tip} type="good" />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No specific strengths found here.</p>
                    )}
                </div>

                {/* Improvements Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-red-100 rounded-md">
                            <svg className="w-4 h-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900">Issues to Fix</h3>
                        <span className="ml-auto text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                            {improveTips.length}
                        </span>
                    </div>
                    {improveTips.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {improveTips.map((tip, idx) => (
                                <ATSTipCard key={idx} tip={tip.tip} type="improve" />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No critical issues found!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ATS;