import type { CampaignForm } from "@/types/campaignForm";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BudgetStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const BudgetStep: React.FC<BudgetStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const [dailyBudget, setDailyBudget] = useState(formData.daily_budget || "");
    const [bidAmount, setBidAmount] = useState(formData.bid_amount || "");

    const handleSubmit = () => {
        if (!dailyBudget || !bidAmount) {
            alert("Please fill out both budget fields.");
            return;
        }
        if (Number(dailyBudget) < 1 || Number(bidAmount) < 1) {
            alert("Budget and bid amount must be at least Rs. 1.");
            return;
        }
        onUpdate({ daily_budget: Number(dailyBudget), bid_amount: Number(bidAmount) });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Budget</h2>
                <p className="text-gray-600 mt-1">
                    Set your daily budget and bid amount.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="daily-budget">Daily Budget (Rs.)</Label>
                    <Input
                        id="daily-budget"
                        type="number"
                        value={dailyBudget}
                        onChange={(e) => setDailyBudget(e.target.value)}
                        placeholder="e.g., 500"
                        min="1"
                    />
                </div>
                <div>
                    <Label htmlFor="bid-amount">Bid Amount (Rs.)</Label>
                    <Input
                        id="bid-amount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="e.g., 10"
                        min="1"
                    />
                </div>
            </div>

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

export default BudgetStep;
