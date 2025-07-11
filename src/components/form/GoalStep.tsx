import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface GoalStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

interface Goal {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

const objectiveToGoals: Record<string, Goal[]> = {
    OUTCOME_AWARENESS: [
        { title: "REACH", desc: "Show your ad to the maximum number of people." },
        { title: "IMPRESSIONS", desc: "Maximize the number of times your ad is shown." },
    ],
    OUTCOME_TRAFFIC: [
        { title: "LINK_CLICKS", desc: "Get people to click on your ad's link." },
        { title: "LANDING_PAGE_VIEWS", desc: "Increase views of your landing page." },
        { title: "REACH", desc: "Show your ad to the maximum number of people." },
        { title: "IMPRESSIONS", desc: "Maximize the number of times your ad is shown." },
    ],
    OUTCOME_ENGAGEMENT: [
        { title: "POST_ENGAGEMENT", desc: "Increase likes, comments, and shares." },
        { title: "PAGE_LIKES", desc: "Get more likes for your page." },
        { title: "VIDEO_VIEWS", desc: "Increase views on your videos." },
    ],
    OUTCOME_LEADS: [
        { title: "LEAD_GENERATION", desc: "Capture potential customer information." },
        { title: "CONVERSIONS", desc: "Drive valuable actions on your website or app." },
    ],
    OUTCOME_SALES: [
        { title: "CONVERSIONS", desc: "Drive valuable actions on your website or app." },
        { title: "VALUE", desc: "Maximize the total value of purchases." },
        { title: "LINK_CLICKS", desc: "Get people to click on your ad's link." },
    ],
    OUTCOME_APP_PROMOTION: [
        { title: "APP_INSTALLS", desc: "Get more people to install your app." },
        { title: "VALUE", desc: "Maximize the total value of in-app purchases." },
        { title: "CONVERSIONS", desc: "Drive valuable actions within your app." },
    ],
};


const GoalStep: React.FC<GoalStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [goal, setGoal] = useState(formData.goal || "");
    const goals = objectiveToGoals[formData.objective || ""] || [];

    const handleSubmit = () => {
        if (!goal) return alert("Please select a goal.");
        onUpdate({ goal });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Goal</h2>
                <p className="text-gray-600 mt-1">
                    Choose the primary goal for your campaign.
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((g) => (
                    <li
                        key={g.title}
                        onClick={() => setGoal(g.title)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer text-left
              ${g.title === goal
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 bg-white hover:shadow"
                            }
            `}
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{g.desc}</h3>
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

export default GoalStep;
