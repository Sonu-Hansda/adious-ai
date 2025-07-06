import CampaignStats from './CampaignStats';
import ActiveCampaigns from './ActiveCampaigns';
import AIAdCopyGenerator from './AIAdCopyGenerator';
import PlatformIntegrations from './PlatformIntegrations';
import PerformanceCharts from './PerformanceCharts';

const DashboardContent = () => {
  return (
    <div className="space-y-6 min-h-full">
      <CampaignStats />
      
      <PerformanceCharts />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveCampaigns />
        
        <AIAdCopyGenerator />
      </div>
      
      <PlatformIntegrations />
    </div>
  );
};

export default DashboardContent;