import { useAuth } from '../context/AuthContext';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;