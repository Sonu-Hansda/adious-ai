import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [platform, setPlatform] = useState('');
  const [generatedCopies, setGeneratedCopies] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);


  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCopies([
        {
          id: 1,
          headline: "Transform Your Business with AI-Powered Solutions",
          primaryText: "Discover how our cutting-edge AI technology can revolutionize your workflow and boost productivity by 300%. Start your free trial today!",
          selected: false
        },
        {
          id: 2,
          headline: "Unlock the Future of Business Automation",
          primaryText: "Join thousands of companies already using our AI platform to streamline operations, reduce costs, and accelerate growth. Get started in minutes!",
          selected: false
        },
        {
          id: 3,
          headline: "AI That Actually Works for Your Business",
          primaryText: "Stop wasting time on manual tasks. Our intelligent automation platform handles the work so you can focus on what matters most - growing your business.",
          selected: false
        }
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleSelection = (id: number) => {
    setGeneratedCopies(prev => 
      prev.map(copy => 
        copy.id === id ? { ...copy, selected: !copy.selected } : copy
      )
    );
  };

  const selectedCount = generatedCopies.filter(copy => copy.selected).length;

  return (
    <DashboardLayout 
      title="AI Ad Copy Generator" 
      subtitle="Generate compelling ad copy using artificial intelligence"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy mb-4 font-inter">Campaign Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Campaign Name</label>
              <Input 
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name"
                className="font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Describe your product/service and target audience
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., We sell eco-friendly yoga mats targeting health-conscious millennials who practice yoga regularly..."
              rows={4}
              className="font-inter"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!prompt || !campaignName || !platform || isGenerating}
            className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium"
          >
            {isGenerating ? '✨ Generating...' : '✨ Generate Ad Copy'}
          </Button>
        </Card>

        {/* Generated Results */}
        {generatedCopies.length > 0 && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-navy font-inter">Generated Ad Variations</h3>
              <div className="text-sm text-gray-600 font-inter">
                Select up to 2 for A/B testing ({selectedCount}/2 selected)
              </div>
            </div>
            
            <div className="space-y-4">
              {generatedCopies.map((copy) => (
                <div 
                  key={copy.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    copy.selected ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSelection(copy.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy mb-2 font-inter">{copy.headline}</h4>
                      <p className="text-gray-700 font-inter">{copy.primaryText}</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ml-4 ${
                      copy.selected ? 'border-gold bg-gold' : 'border-gray-300'
                    }`}>
                      {copy.selected && (
                        <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedCount === 2 && (
              <div className="mt-6 flex justify-end">
                <Button className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium">
                  Create Campaign with Selected Variants
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIGenerator;