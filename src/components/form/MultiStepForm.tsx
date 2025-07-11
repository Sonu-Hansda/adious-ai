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

const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CampaignForm>({});
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

    const handleSubmit = () => {
        toast({
            title: "New Campaign Created",
            description: "Your campaign has been successfully created.",
        });
        navigate('/campaigns');
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
                        onNext={() => setStep(8)} // Go to PreviewStep
                        onPrev={() => setStep(6)} // Go back to CreateAdStep
                        onUpdate={updateFormData}
                        formData={formData!}
                    />
                );
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
