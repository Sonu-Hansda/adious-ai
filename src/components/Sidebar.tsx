import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: '📊', path: '/dashboard' },
  { name: 'Campaigns', icon: '🚀', path: '/campaigns' },
  { name: 'AI Copy Generator', icon: '✨', path: '/ai-generator' },
  { name: 'Analytics', icon: '📈', path: '/analytics' },
  { name: 'A/B Testing', icon: '🧪', path: '/ab-testing' },
  { name: 'Integrations', icon: '🔗', path: '/integrations' },
  { name: 'Billing', icon: '💳', path: '/billing' },
  { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-navy text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-navy-400">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-navy font-bold text-xl font-outfit">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold font-inter">Adious AI</h1>
            <p className="text-xs text-gray-300 font-inter">Ads Management Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-inter mb-2">MONITORING</p>
          <ul className="space-y-1">
            {navigation.slice(0, 4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-inter text-sm",
                      isActive
                        ? "bg-gold text-navy font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-navy-600 hover:text-white"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-inter mb-2">AD CAMPAIGNS</p>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/campaigns"
                className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gold hover:bg-navy-600 rounded-lg font-inter"
              >
                <span>+</span>
                <span>New Campaign</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-1">
            {navigation.slice(4).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-inter text-sm",
                      isActive
                        ? "bg-gold text-navy font-semibold shadow-lg"
                        : "text-gray-300 hover:bg-navy-600 hover:text-white"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;