import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CampaignForm } from '@/types/campaignForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import apiClient from '@/lib/api';

interface AIAdCreativeProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<CampaignForm>) => void;
  formData: CampaignForm;
  setAdCopy: (adCopy: any) => void;
}

const AIAdCreative: React.FC<AIAdCreativeProps> = ({ onNext, onPrev, onUpdate, formData, setAdCopy }) => {
  const [prompt, setPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const headersList = {
        "Content-Type": "application/json"
      }
      const bodyContent = JSON.stringify({
        "Prompt": prompt,
      });
      const reqOptions = {
        url: import.meta.env.VITE_AD_COPY_GENERATOR_URL,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }
      const response = await apiClient.request(reqOptions);
      const adCopyData = response.data;
      console.log(adCopyData);
      setAdCopy(adCopyData);
      onNext();
    } catch (error) {
      console.error('Failed to generate ad copy:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const callToActionTypes: Array<{value: string, label: string}> = [
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
        <h2 className="text-3xl font-bold text-gray-900">Generate Ad with AI</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="ad-prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Describe Your Ad
          </label>
          <textarea name="ad-prompt" id="ad-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300' placeholder="e.g., Create an ad for a new line of summer clothing."></textarea>
        </div>
        <div>
          <label htmlFor="call-to-action" className="block text-sm font-medium text-gray-700 mb-1">
            Call to Action
          </label>
          <Select onValueChange={(value) => onUpdate({
            creative: {
              ...formData.creative,
              object_story_spec: {
                ...formData.creative?.object_story_spec,
                call_to_action: {
                  ...formData.creative?.object_story_spec?.call_to_action,
                  type: value
                }
              }
            }
          })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a call to action" />
            </SelectTrigger>
            <SelectContent>
              {callToActionTypes.map((cta) => (
                <SelectItem key={cta.value} value={cta.value}>{cta.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="call-to-action" className="block text-sm font-medium text-gray-700 mb-1">
            Link
          </label>
          <input
            id="link"
            type="text"
            value={formData?.creative?.object_story_spec?.link ? formData.creative?.object_story_spec?.link : ''}
            onChange={(e) => onUpdate({
              creative: {
                ...formData.creative,
                object_story_spec: {
                  ...formData.creative?.object_story_spec,
                  link: e.target.value
                }
              }
            })}
            placeholder="E.g., https://example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="outline">
            Prev
          </Button>
          <Button className='bg-gold hover:bg-gold-600 text-navy font-bold px-6 py-2 rounded-lg shadow-md transition-all duration-200' onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdCreative;
