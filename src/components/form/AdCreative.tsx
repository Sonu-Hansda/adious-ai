import type { CampaignForm } from "@/types/campaignForm";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdCreativeProps {
    onNext: () => void;
    onPrev: () => void;
    onUpdate: (data: Partial<CampaignForm>) => void;
    formData: CampaignForm;
}

const callToActionTypes = [
    { value: "SHOP_NOW", label: "Shop Now" },
    { value: "BOOK_TRAVEL", label: "Book Travel" },
    { value: "LEARN_MORE", label: "Learn More" },
    { value: "SIGN_UP", label: "Sign Up" },
    { value: "DOWNLOAD", label: "Download" },
    { value: "INSTALL_MOBILE_APP", label: "Install Mobile App" },
    { value: "USE_MOBILE_APP", label: "Use Mobile App" },
    { value: "WATCH_VIDEO", label: "Watch Video" },
    { value: "WATCH_MORE", label: "Watch More" },
    { value: "OPEN_LINK", label: "Open Link" },
];

const AdCreative: React.FC<AdCreativeProps> = ({ onNext, onPrev, onUpdate, formData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts[0] === 'creative' && nameParts.length === 2) {
            onUpdate({
                creative: {
                    ...formData.creative,
                    name: value,
                },
            });
        } else if (nameParts[0] === 'creative' && nameParts[1] === 'object_story_spec' && nameParts.length === 3) {
            const [, , field] = nameParts;
            onUpdate({
                creative: {
                    ...formData.creative,
                    object_story_spec: {
                        ...formData.creative?.object_story_spec,
                        [field]: value,
                    },
                },
            });
        } else if (nameParts[0] === 'creative' && nameParts[1] === 'object_story_spec' && nameParts.length === 4) {
            const [, , linkDataKey, field] = nameParts;
            onUpdate({
                creative: {
                    ...formData.creative,
                    object_story_spec: {
                        ...formData.creative?.object_story_spec,
                        [linkDataKey]: {
                            ...(formData.creative?.object_story_spec?.[linkDataKey as 'link_data1' | 'link_data2'] || {}),
                            [field]: value,
                        },
                    },
                },
            });
        }
    };

    const handleCallToActionChange = (value: string) => {
        onUpdate({
            creative: {
                ...formData.creative,
                object_story_spec: {
                    ...formData.creative?.object_story_spec,
                    call_to_action: {
                        ...formData.creative?.object_story_spec?.call_to_action,
                        type: value,
                    },
                },
            },
        });
    }

    const handleCallToActionLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onUpdate({
            creative: {
                ...formData.creative,
                object_story_spec: {
                    ...formData.creative?.object_story_spec,
                    call_to_action: {
                        ...formData.creative?.object_story_spec?.call_to_action,
                        value: { link: value },
                    },
                },
            },
        });
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Ad Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="creative.name">Group Name</Label>
                    <Input
                        id="creative.name"
                        name="creative.name"
                        value={formData.creative?.name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="creative.object_story_spec.link">Link</Label>
                    <Input
                        id="creative.object_story_spec.link"
                        name="creative.object_story_spec.link"
                        value={formData.creative?.object_story_spec?.link || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="creative.object_story_spec.call_to_action.type">Call to Action Type</Label>
                        <Select
                            onValueChange={handleCallToActionChange}
                            value={formData.creative?.object_story_spec?.call_to_action?.type || ''}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a call to action" />
                            </SelectTrigger>
                            <SelectContent>
                                {callToActionTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="creative.object_story_spec.call_to_action.value.link">Call to Action Link</Label>
                        <Input
                            id="creative.object_story_spec.call_to_action.value.link"
                            name="creative.object_story_spec.call_to_action.value.link"
                            value={formData.creative?.object_story_spec?.call_to_action?.value?.link || ''}
                            onChange={handleCallToActionLinkChange}
                        />
                    </div>
                </div>


                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ad 1</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data1.message">Message</Label>
                            <Input
                                id="creative.object_story_spec.link_data1.message"
                                name="creative.object_story_spec.link_data1.message"
                                value={formData.creative?.object_story_spec?.link_data1?.message || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data1.name">Name</Label>
                            <Input
                                id="creative.object_story_spec.link_data1.name"
                                name="creative.object_story_spec.link_data1.name"
                                value={formData.creative?.object_story_spec?.link_data1?.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data1.description">Description</Label>
                            <Input
                                id="creative.object_story_spec.link_data1.description"
                                name="creative.object_story_spec.link_data1.description"
                                value={formData.creative?.object_story_spec?.link_data1?.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ad 2</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data2.message">Message</Label>
                            <Input
                                id="creative.object_story_spec.link_data2.message"
                                name="creative.object_story_spec.link_data2.message"
                                value={formData.creative?.object_story_spec?.link_data2?.message || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data2.name">Name</Label>
                            <Input
                                id="creative.object_story_spec.link_data2.name"
                                name="creative.object_story_spec.link_data2.name"
                                value={formData.creative?.object_story_spec?.link_data2?.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creative.object_story_spec.link_data2.description">Description</Label>
                            <Input
                                id="creative.object_story_spec.link_data2.description"
                                name="creative.object_story_spec.link_data2.description"
                                value={formData.creative?.object_story_spec?.link_data2?.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button onClick={onPrev} variant="outline">Prev</Button>
                    <Button onClick={onNext}>Next</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdCreative;
