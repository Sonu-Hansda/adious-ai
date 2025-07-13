import React, { useState } from "react";
import ObjectiveStep from "./ObjectiveStep";
import CampaignNameStep from "./CampaignNameStep";
import GoalStep from "./GoalStep";
import EventStep from "./EventStep";
import BudgetStep from "./BudgetStep";
import type { CampaignForm } from "@/types/campaignForm";
import AdCreative from "./AdCreative";
import PreviewStep from "./PreviewStep";
import CreateAdStep from "./CreateAdStep";
import AIAdCreative from "./AIAdCreative";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UpdatingStep from "./UpdatingStep";
import apiClient from "@/lib/api";

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CampaignForm>({});
    const { user } = useAuth();
    const navigate = useNavigate();

    const updateFormData = (data: Partial<CampaignForm>) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
    };


    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const goToAdCreation = () => {
        setStep(7);
    }

    const goToAICreation = () => {
        setStep(9);
    }

    const goToUpdating = () => {
        setStep(10);
    }

    const handleSubmit = async () => {
        goToUpdating();
        const { name, objective, goal, budget_type, daily_budget, lifetime_budget, start_time, end_time, bid_amount, creative, event } = formData;

        const adSetData: any = {
            optimization_goal: goal,
            billing_event: event,
            bid_amount: bid_amount,
            budget_type: budget_type,
            targeting: {
                geo_locations: {
                    countries: ["IN"]
                },
                facebook_positions: ["feed"]
            },
            status: "PAUSED"
        };

        if (budget_type === 'daily') {
            adSetData.daily_budget = daily_budget;
        } else {
            adSetData.lifetime_budget = lifetime_budget;
            adSetData.start_time = start_time;
            adSetData.end_time = end_time;
        }

        const linkData = {
            message: creative?.object_story_spec?.link_data1?.message,
            link: creative?.object_story_spec?.link,
            name: creative?.name,
            description: creative?.object_story_spec?.link_data1?.message,
            call_to_action: {
                type: creative?.object_story_spec?.call_to_action?.type,
                value: {
                    link: creative?.object_story_spec?.link
                }
            }
        };

        const finalData = {
            user_id: user?.id,
            campaign: {
                name: name,
                objective: objective,
                status: "PAUSED"
            },
            ad_set: adSetData,
            creative: {
                object_story_spec: {
                    link_data1: linkData,
                    link_data2: linkData
                }
            },
            ad: {
                status: "PAUSED"
            }
        };

        console.log(JSON.stringify(finalData));

        try {
            await apiClient.post(import.meta.env.VITE_CREATE_CAMPAIGN_URL, finalData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast({
                title: "New Campaign Created",
                description: "Your campaign has been successfully created.",
            });
            navigate('/campaigns');
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Failed to create campaign. Please try again.",
                variant: "destructive"
            });
            setStep(8);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <CampaignNameStep
                        onNext={nextStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 2:
                return (
                    <ObjectiveStep
                        onNext={nextStep}
                        onPrev={prevStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 3:
                return (
                    <GoalStep
                        onNext={nextStep}
                        onPrev={prevStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 4:
                return (
                    <EventStep
                        onNext={nextStep}
                        onPrev={prevStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 5:
                return (
                    <BudgetStep
                        onNext={nextStep}
                        onPrev={prevStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 6:
                return (
                    <CreateAdStep
                        onPrev={prevStep}
                        onCreateAdManually={goToAdCreation}
                        onCreateAdWithAI={goToAICreation}
                    />
                );
            case 7:
                return (
                    <AdCreative
                        onNext={nextStep}
                        onPrev={prevStep}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 8:
                return (
                    <PreviewStep
                        onPrev={prevStep}
                        onSubmit={handleSubmit}
                        formData={formData!}
                    />
                );
            case 9:
                return (
                    <AIAdCreative
                        onNext={() => setStep(8)}
                        onPrev={() => setStep(6)}
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
            case 10:
                return <UpdatingStep />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            {renderStep()}
        </div>
    );
};

export default MultiStepForm;
