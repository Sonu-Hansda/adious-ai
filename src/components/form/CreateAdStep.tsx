import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateAdStepProps {
    onPrev: () => void;
    onCreateAdManually: () => void;
    onCreateAdWithAI: () => void;
}

const CreateAdStep: React.FC<CreateAdStepProps> = ({ onPrev, onCreateAdManually, onCreateAdWithAI }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Ad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Choose how you want to create your ad.</p>
                <div className="flex justify-between">
                    <Button onClick={onPrev} variant="outline">Prev</Button>
                    <div className="flex space-x-4">
                        <Button onClick={onCreateAdManually}>Manually</Button>
                        <Button onClick={onCreateAdWithAI}>✨ Generate via AI</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CreateAdStep;
