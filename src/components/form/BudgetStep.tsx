import type { CampaignForm } from "@/types/campaignForm";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "../ui/calendar";

interface BudgetStepProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const BudgetStep: React.FC<BudgetStepProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const { toast } = useToast();
    const [budgetType, setBudgetType] = useState<"daily" | "lifetime">(formData.budget_type || "daily");
    const [dailyBudget, setDailyBudget] = useState(formData.daily_budget || "");
    const [lifetimeBudget, setLifetimeBudget] = useState(formData.lifetime_budget || "");
    const [bidAmount, setBidAmount] = useState(formData.bid_amount || "");
    const [startDate, setStartDate] = useState<Date | undefined>(
        formData.start_time ? new Date(formData.start_time) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        formData.end_time ? new Date(formData.end_time) : undefined
    );

    const [minLifetimeBudget, setMinLifetimeBudget] = useState(0);

    useEffect(() => {
        if (budgetType === "lifetime" && startDate && endDate && endDate > startDate) {
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setMinLifetimeBudget(diffDays * 100);
        } else {
            setMinLifetimeBudget(0);
        }
    }, [startDate, endDate, budgetType]);

    const handleSubmit = () => {
        if (!bidAmount) {
            toast({ title: "Error", description: "Please fill out the bid amount." });
            return;
        }

        if (budgetType === "daily") {
            if (!dailyBudget) {
                toast({ title: "Error", description: "Please fill out the daily budget." });
                return;
            }
            if (Number(dailyBudget) < 9000) {
                toast({ title: "Error", description: "Daily budget must be at least Rs. 9000." });
                return;
            }
            if (Number(bidAmount) < 100) {
                toast({ title: "Error", description: "Bid amount must be at least Rs. 100." });
                return;
            }
            onUpdate({
                budget_type: "daily",
                daily_budget: Number(dailyBudget),
                bid_amount: Number(bidAmount),
                lifetime_budget: undefined,
                start_time: undefined,
                end_time: undefined,
            });
        } else {
            if (Number(bidAmount) < 100) {
                toast({ title: "Error", description: "Bid amount must be at least Rs. 100." });
                return;
            }
            if (!lifetimeBudget) {
                toast({ title: "Error", description: "Please fill out the lifetime budget." });
                return;
            }
            if (!startDate || !endDate) {
                toast({ title: "Error", description: "Please select a start and end date." });
                return;
            }
            if (endDate <= startDate) {
                toast({ title: "Error", description: "End date must be after the start date." });
                return;
            }
            if (Number(lifetimeBudget) < minLifetimeBudget) {
                toast({
                    title: "Error",
                    description: `Lifetime budget must be at least Rs. ${minLifetimeBudget}.`,
                });
                return;
            }
            onUpdate({
                budget_type: "lifetime",
                lifetime_budget: Number(lifetimeBudget),
                bid_amount: Number(bidAmount),
                start_time: startDate.toISOString(),
                end_time: endDate.toISOString(),
                daily_budget: undefined,
            });
        }
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Budget</h2>
                <p className="text-gray-600 mt-1">
                    Set your budget and bid amount.
                </p>
            </div>

            <RadioGroup value={budgetType} onValueChange={(value) => setBudgetType(value as "daily" | "lifetime")} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lifetime" id="lifetime" />
                    <Label htmlFor="lifetime">Lifetime</Label>
                </div>
            </RadioGroup>

            <div className="space-y-4">
                {budgetType === "daily" ? (
                    <div>
                        <Label htmlFor="daily-budget">Daily Budget (Rs.)</Label>
                        <Input
                            id="daily-budget"
                            type="number"
                            value={dailyBudget}
                            onChange={(e) => setDailyBudget(e.target.value)}
                            placeholder="e.g., 9000"
                            min="9000"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="lifetime-budget">Lifetime Budget (Rs.)</Label>
                            <Input
                                id="lifetime-budget"
                                type="number"
                                value={lifetimeBudget}
                                onChange={(e) => setLifetimeBudget(e.target.value)}
                                placeholder="e.g., 7000"
                                min={minLifetimeBudget}
                            />
                            {minLifetimeBudget > 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Minimum budget: Rs. {minLifetimeBudget}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Start Date</Label>
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    className="rounded-md border"
                                />
                            </div>
                            <div>
                                <Label>End Date</Label>
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    className="rounded-md border"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <Label htmlFor="bid-amount">Bid Amount (Rs.)</Label>
                    <Input
                        id="bid-amount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="e.g., 100"
                        min="100"
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
