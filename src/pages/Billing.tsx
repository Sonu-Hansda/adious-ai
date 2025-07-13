import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import AddBalanceDialog from '@/components/AddBalanceDialog';

const transactions = [
  { id: 1, amount: 5000, type: 'added', date: '2025-07-13' },
  { id: 2, amount: 1200, type: 'deducted', date: '2025-07-12' },
  { id: 3, amount: 300, type: 'deducted', date: '2025-07-11' },
  { id: 4, amount: 10000, type: 'added', date: '2025-07-10' },
  { id: 5, amount: 500, type: 'deducted', date: '2025-07-09' },
];

const Billing = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await apiClient.get(import.meta.env.VITE_GET_BALANCE_URL, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setBalance(response.data.total_balance);
      } catch (error) {
        console.error("Failed to fetch balance", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchBalance();
    }
  }, [user]);

  return (
    <DashboardLayout
      title="Billing"
      subtitle="Manage your balance and view transaction history"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Balance</CardTitle>
            <AddBalanceDialog />
          </CardHeader>
          <CardContent>
            {loading ? <p>Loading...</p> : <p className="text-4xl font-bold">₹{balance.toLocaleString()}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial No.</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'added' ? 'default' : 'destructive'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
