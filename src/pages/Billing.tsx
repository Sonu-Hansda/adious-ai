import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Billing = () => {

  return (
    <DashboardLayout 
      title="Billing & Usage" 
      subtitle="Manage your subscription and usage"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-2 font-inter">Current Plan</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-gold text-navy">Professional</Badge>
              <span className="text-2xl font-bold text-navy font-inter">$99/mo</span>
            </div>
            <Button variant="outline" className="w-full font-outfit">Manage Plan</Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-2 font-inter">Usage This Month</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-inter">API Calls</span>
                <span className="font-semibold font-inter">8,450 / 10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gold h-2 rounded-full" style={{ width: '84.5%' }}></div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-navy mb-2 font-inter">Next Billing</h3>
            <div className="text-2xl font-bold text-navy mb-2 font-inter">Dec 15, 2024</div>
            <div className="text-gray-600 font-inter">Amount: $99.00</div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;