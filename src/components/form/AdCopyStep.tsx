import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CampaignForm } from '@/types/campaignForm';

interface AdCopyStepProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<CampaignForm>) => void;
  formData: CampaignForm;
  adCopy: {
    Headlines: { [key: string]: string };
    PrimaryTexts: { [key: string]: string };
  };
}

const AdCopyStep: React.FC<AdCopyStepProps> = ({ onNext, onPrev, onUpdate, adCopy, formData }) => {
  const [selectedHeadlines, setSelectedHeadlines] = useState<string[]>([]);
  const [selectedPrimaryTexts, setSelectedPrimaryTexts] = useState<string[]>([]);

  const handleHeadlineSelect = (headline: string) => {
    setSelectedHeadlines(prev =>
      prev.includes(headline)
        ? prev.filter(h => h !== headline)
        : [...prev, headline].slice(0, 2)
    );
  };

  const handlePrimaryTextSelect = (text: string) => {
    setSelectedPrimaryTexts(prev =>
      prev.includes(text)
        ? prev.filter(t => t !== text)
        : [...prev, text].slice(0, 2)
    );
  };

  const handleNext = () => {
    onUpdate({
      creative: {
        ...formData.creative,
        name: 'AI Generated Ad',
        object_story_spec: {
          ...formData.creative?.object_story_spec,
          link_data1: {
            ...formData.creative?.object_story_spec?.link_data1,
            name: selectedHeadlines[0],
            message: selectedPrimaryTexts[0],
          },
          link_data2: {
            ...formData.creative?.object_story_spec?.link_data2,
            name: selectedHeadlines[1],
            message: selectedPrimaryTexts[1],
          },
        },
      },
    });
    onNext();
  };

  if (!adCopy) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-bold text-gray-900">Select Ad Copy</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Headlines</h3>
          <div className="space-y-2">
            {Object.values(adCopy.Headlines).map((headline) => (
              <Card
                key={headline}
                className={`p-4 cursor-pointer ${selectedHeadlines.includes(headline) ? 'border-blue-500 border-2' : 'border'}`}
                onClick={() => handleHeadlineSelect(headline)}
              >
                {headline}
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Primary Texts</h3>
          <div className="space-y-2">
            {Object.values(adCopy.PrimaryTexts).map((text) => (
              <Card
                key={text}
                className={`p-4 cursor-pointer ${selectedPrimaryTexts.includes(text) ? 'border-blue-500 border-2' : 'border'}`}
                onClick={() => handlePrimaryTextSelect(text)}
              >
                {text}
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="outline">
            Prev
          </Button>
          <Button onClick={handleNext} disabled={selectedHeadlines.length < 2 || selectedPrimaryTexts.length < 2}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCopyStep;
