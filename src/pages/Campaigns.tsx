import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const campaigns = [
  {
    id: 1,
    name: 'Black Friday Sale 2024',
    platform: 'Meta',
    status: 'Active',
    budget: '$500/day',
    spent: '$1,250',
    impressions: '125,000',
    clicks: '3,200',
    ctr: '2.56%',
    cpa: '$24.50'
  },
  {
    id: 2,
    name: 'Holiday Collection Launch',
    platform: 'Google',
    status: 'Active',
    budget: '$300/day',
    spent: '$890',
    impressions: '89,000',
    clicks: '2,100',
    ctr: '2.36%',
    cpa: '$18.20'
  },
  {
    id: 3,
    name: 'TikTok Brand Awareness',
    platform: 'TikTok',
    status: 'Paused',
    budget: '$200/day',
    spent: '$450',
    impressions: '45,000',
    clicks: '1,200',
    ctr: '2.67%',
    cpa: '$32.10'
  }
];

const Campaigns = () => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Meta': return 'bg-blue-100 text-blue-800';
      case 'Google': return 'bg-red-100 text-red-800';
      case 'TikTok': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout
      title="Campaign Management"
      subtitle="Create, monitor, and optimize your advertising campaigns"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium">
              ✨ New Campaign
            </Button>
            <Button variant="outline" className="border-gray-300 font-outfit">
              Import Campaigns
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">Paused</Button>
            <Button variant="outline" size="sm">Draft</Button>
          </div>
        </div>

        {/* Campaigns Table */}
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Campaign</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Platform</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Budget</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Spent</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Impressions</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">CTR</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">CPA</th>
                  <th className="text-left p-4 font-medium text-gray-600 font-inter">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-navy font-inter">{campaign.name}</div>
                        <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getPlatformColor(campaign.platform)}>
                        {campaign.platform}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="p-4 font-inter">{campaign.budget}</td>
                    <td className="p-4 font-inter">{campaign.spent}</td>
                    <td className="p-4 font-inter">{campaign.impressions}</td>
                    <td className="p-4 font-inter">{campaign.ctr}</td>
                    <td className="p-4 font-inter">{campaign.cpa}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">
                          {campaign.status === 'Active' ? 'Pause' : 'Resume'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;