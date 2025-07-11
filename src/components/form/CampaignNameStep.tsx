import React, { useState } from "react";
import { Button } from "../ui/button";
import type { CampaignForm } from "@/types/campaignForm";
import { Label } from "../ui/label";

interface CampaignNameStepProps {
    onNext: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const CampaignNameStep: React.FC<CampaignNameStepProps> = ({
    onNext,
    onUpdate,
    formData,
}) => {
    const [campaignName, setCampaignName] = useState(formData.name || "");
    const [platform, setPlatform] = useState(formData.platform || "meta");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaignName.trim()) {
            setError("Campaign name is required");
            return;
        }
        onUpdate({ name: campaignName, platform: platform as 'meta' | 'google' | 'tiktok' });
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Name and Platform</h2>
                <p className="text-gray-600 mt-1">
                    Give your campaign a descriptive name and choose the platform where you want to run your ads.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <input
                        id="campaignName"
                        type="text"
                        value={campaignName}
                        onChange={(e) => {
                            setCampaignName(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="E.g., Black Friday Sale - Meta Ads"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                            }`}
                    />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>

                <div>
                    <Label>Platform</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className={`cursor-pointer rounded-lg border p-4 text-center ${platform === 'meta' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPlatform('meta')}
                        >
                            Meta
                        </div>
                        <div
                            className={`cursor-pointer rounded-lg border p-4 text-center ${platform === 'google' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPlatform('google')}
                        >
                            Google
                        </div>
                        <div
                            className={`cursor-pointer rounded-lg border p-4 text-center ${platform === 'tiktok' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPlatform('tiktok')}
                        >
                            TikTok
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pt-2">
                    <Button
                        type="submit"
                        className="bg-gold hover:bg-gold-600 text-navy font-medium uppercase tracking-wide"
                    >
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CampaignNameStep;
