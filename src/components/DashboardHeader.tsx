import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy font-inter">Campaign Dashboard</h1>
          <p className="text-gray-600 font-inter">Monitor and optimize your ad campaigns with AI-powered insights</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-navy font-outfit font-medium uppercase tracking-wide"
          >
            ✨ Generate Ads
          </Button>
          <Button
            className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
          >
            New Campaign
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 font-outfit font-medium uppercase tracking-wide"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;