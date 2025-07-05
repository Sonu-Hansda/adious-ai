import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, Edit, Plus, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CampaignForm from './CampaignForm';
import Analytics from './Analytics';
import AIAdCopyGenerator from './AIAdCopyGenerator';

interface Campaign {
    id: number;
    name: string;
    platform: 'Meta' | 'Google' | 'TikTok';
    status: 'Active' | 'Paused';
    budget: number;
    spent: number;
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    cpa: number;
}

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
    const { toast } = useToast();

    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            id: 1,
            name: 'Holiday Sale Campaign',
            platform: 'Meta',
            status: 'Active',
            budget: 500,
            spent: 342,
            impressions: 45000,
            clicks: 890,
            ctr: 1.98,
            cpc: 0.38,
            cpa: 12.50
        },
        {
            id: 2,
            name: 'Product Launch - Summer',
            platform: 'Google',
            status: 'Active',
            budget: 800,
            spent: 567,
            impressions: 62000,
            clicks: 1240,
            ctr: 2.00,
            cpc: 0.46,
            cpa: 15.20
        },
        {
            id: 3,
            name: 'Brand Awareness TikTok',
            platform: 'TikTok',
            status: 'Paused',
            budget: 300,
            spent: 180,
            impressions: 28000,
            clicks: 420,
            ctr: 1.50,
            cpc: 0.43,
            cpa: 18.90
        }
    ]);

    const handleEditCampaign = (campaign: Campaign) => {
        console.log('Editing campaign:', campaign);
        setEditingCampaign(campaign);
        setActiveTab('create');
        toast({
            title: "Edit Mode",
            description: `Now editing "${campaign.name}". Make your changes and save.`,
        });
    };

    const handleToggleCampaignStatus = (campaignId: number) => {
        setCampaigns(prevCampaigns =>
            prevCampaigns.map(campaign => {
                if (campaign.id === campaignId) {
                    const newStatus = campaign.status === 'Active' ? 'Paused' : 'Active';
                    console.log(`Campaign ${campaign.name} status changed from ${campaign.status} to ${newStatus}`);

                    toast({
                        title: `Campaign ${newStatus}`,
                        description: `"${campaign.name}" has been ${newStatus.toLowerCase()}.`,
                    });

                    return { ...campaign, status: newStatus };
                }
                return campaign;
            })
        );
    };

    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            case 'Paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Campaign Dashboard</h1>
                    <p className="text-slate-600 mt-1">Manage and monitor your ad campaigns</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingCampaign(null);
                        setActiveTab('create');
                    }}
                    className="text-white bg-slate-900 hover:bg-slate-800 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Campaign</span>
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                    <TabsTrigger value="create" className="data-[state=active]:bg-white">Create Campaign</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-white">Analytics</TabsTrigger>
                    <TabsTrigger value="ai-copy" className="data-[state=active]:bg-white">AI Ad Copy</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 animate-fade-in">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">Total Budget</CardTitle>
                                <BarChart className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">${totalBudget.toLocaleString()}</div>
                                <p className="text-xs text-slate-500">Across all campaigns</p>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">Total Spent</CardTitle>
                                <BarChart className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString()}</div>
                                <p className="text-xs text-slate-500">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">Impressions</CardTitle>
                                <BarChart className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{totalImpressions.toLocaleString()}</div>
                                <p className="text-xs text-slate-500">Total reach</p>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">Clicks</CardTitle>
                                <BarChart className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{totalClicks.toLocaleString()}</div>
                                <p className="text-xs text-slate-500">{((totalClicks / totalImpressions) * 100).toFixed(2)}% CTR</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Campaigns List */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-slate-900">Active Campaigns</CardTitle>
                            <CardDescription>Monitor and manage your running campaigns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {campaigns.map((campaign) => (
                                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                                                <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                                                <Badge variant="outline" className="text-slate-600">{campaign.platform}</Badge>
                                            </div>
                                            <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-slate-600">
                                                <div>Budget: <span className="font-medium">${campaign.budget}</span></div>
                                                <div>Spent: <span className="font-medium">${campaign.spent}</span></div>
                                                <div>CTR: <span className="font-medium">{campaign.ctr}%</span></div>
                                                <div>CPC: <span className="font-medium">${campaign.cpc}</span></div>
                                                <div>CPA: <span className="font-medium">${campaign.cpa}</span></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-slate-300"
                                                onClick={() => handleEditCampaign(campaign)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={campaign.status === 'Active' ? 'destructive' : 'default'}
                                                className={campaign.status === 'Active' ? 'bg-red-400' : 'bg-green-600 hover:bg-green-700 text-white'}
                                                onClick={() => handleToggleCampaignStatus(campaign.id)}
                                            >
                                                {campaign.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create" className="animate-fade-in">
                    <CampaignForm editingCampaign={editingCampaign} />
                </TabsContent>

                <TabsContent value="analytics" className="animate-fade-in">
                    <Analytics campaigns={campaigns} />
                </TabsContent>

                <TabsContent value="ai-copy" className="animate-fade-in">
                    <AIAdCopyGenerator />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;