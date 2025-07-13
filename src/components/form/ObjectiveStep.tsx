import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface ObjectiveStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

interface Objective {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

const ObjectiveStep: React.FC<ObjectiveStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [objective, setObjective] = useState(formData.objective || "");

    const objectives: Objective[] = [
        {
            title: "OUTCOME_TRAFFIC",
            desc: "Drive traffic to your website or app",
        },
        {
            title: "OUTCOME_ENGAGEMENT",
            desc: "Boost engagement on your posts, pages, or videos",
        },
        {
            title: "OUTCOME_LEADS",
            desc: "Generate leads through forms, messages, or calls",
        },
    ];

    const handleSubmit = () => {
        if (!objective) return alert("Please select an objective.");
        onUpdate({ objective });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Objective</h2>
                <p className="text-gray-600 mt-1">
                    Choose the main goal of your campaign to get started.
                </p>
            </div>

            {/* Grid of selectable objectives */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((obj) => (
                    <li
                        key={obj.title}
                        onClick={() => setObjective(obj.title)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer text-left
              ${obj.title === objective
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 bg-white hover:shadow"
                            }
            `}
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{obj.desc}</h3>
                        {/* <p className="text-sm text-gray-500 mt-1">{obj.title}</p> */}
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <Button
                    onClick={onPrev}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-medium uppercase tracking-wide"
                >
                    Prev
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-gold hover:bg-gold-600 text-navy font-medium uppercase tracking-wide"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ObjectiveStep;