import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview, getDashboardSummary } from '@/network/dashboard';

console.log("useDashboardData hook loaded");

const fetchDashboardData = async (period) => {
  const [overview, summary] = await Promise.all([
       getDashboardSummary(),
       getDashboardOverview(period),
  ]);
  console.log({overview, summary});
  return { overview, summary };
};

export const useDashboardData = (period = 'month') => {
  return useQuery({ 
    queryKey: ['dashboard-data', period], 
    queryFn: () => fetchDashboardData(period),
  });
};                                                                                                                                                         