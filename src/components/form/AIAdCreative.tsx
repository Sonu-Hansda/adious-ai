import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '../ui/textarea';
import type { CampaignForm } from '@/types/campaignForm';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AIAdCreativeProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<CampaignForm>) => void;
  formData: CampaignForm;
}

const AIAdCreative: React.FC<AIAdCreativeProps> = ({ onNext, onPrev, onUpdate }) => {
  const handleNext = () => {
    // In a real scenario, we would use the prompt to generate ad copy.
    // For now, we'll just use some fake data.
    const fakeAdData: Partial<CampaignForm> = {
      creative: {
        name: 'AI Generated Ad Group',
        object_story_spec: {
          link: 'https://example.com/ai-product',
          call_to_action: {
            type: 'LEARN_MORE',
            value: {
              link: 'https://example.com/ai-learn-more',
            },
          },
          link_data1: {
            name: 'AI Ad 1',
            message: 'This is an AI generated ad message.',
          },
          link_data2: {
            name: 'AI Ad 2',
            message: 'This is another AI generated ad message.',
          },
        },
      },
    };
    onUpdate(fakeAdData);
    onNext();
  };

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


  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Ad with AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="ad-prompt">Describe Your Ad</label>
          <Textarea id="ad-prompt" placeholder="e.g., Create an ad for a new line of summer clothing." />
        </div>
        <div>
          <label htmlFor="ad-group-name">Ad Group Name</label>
          <Input id="ad-group-name" />
        </div>
        <div>
          <label htmlFor="call-to-action">Call to Action</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a call to action" />
            </SelectTrigger>
            <SelectContent>
              {callToActionTypes.map((cta) => (
                <SelectItem value={cta.value}>{cta.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="call-to-action-link">Call to Action Link</label>
          <Input id="call-to-action-link" />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <Input id="link" />
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="outline">
            Prev
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdCreative;
