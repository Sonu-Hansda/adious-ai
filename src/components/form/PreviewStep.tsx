import type { CampaignForm, Ad } from "@/types/campaignForm";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface PreviewStepProps {
    onPrev: () => void;
    onSubmit: () => void;
    formData: CampaignForm;
}

const AdPreviewCard: React.FC<{ ad: Ad, title: string, link?: string, call_to_action?: { type?: string, value?: { link?: string } } }> = ({ ad, title, link, call_to_action }) => {
    if (!ad) {
        return null;
    }

    return (
        <Card className="w-full mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {link && <img className="w-full h-48 object-cover" src={link} alt={ad.name} />}
                <div className="p-4">
                    <h3 className="text-lg font-bold">{ad.name}</h3>
                    <p className="text-gray-600 text-sm">{ad.description}</p>
                    <p className="text-gray-800 mt-2">{ad.message}</p>
                </div>
            </CardContent>
            <CardFooter>
                {call_to_action?.type && (
                    <Button className="w-full" asChild>
                        <a href={call_to_action.value?.link} target="_blank" rel="noopener noreferrer">
                            {call_to_action.type.replace(/_/g, ' ')}
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

const PreviewStep: React.FC<PreviewStepProps> = ({ onPrev, onSubmit, formData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ad Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-4">
                    {formData.creative?.object_story_spec?.link_data1 && (
                        <AdPreviewCard
                            ad={formData.creative.object_story_spec.link_data1}
                            title="Ad 1"
                            link={formData.creative.object_story_spec.link}
                            call_to_action={formData.creative.object_story_spec.call_to_action}
                        />
                    )}
                    {formData.creative?.object_story_spec?.link_data2 && (
                        <AdPreviewCard
                            ad={formData.creative.object_story_spec.link_data2}
                            title="Ad 2"
                            link={formData.creative.object_story_spec.link}
                            call_to_action={formData.creative.object_story_spec.call_to_action}
                        />
                    )}
                </div>
                <div className="flex justify-between">
                    <Button onClick={onPrev} variant="outline">Prev</Button>
                    <Button onClick={onSubmit}>Publish</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default PreviewStep;
