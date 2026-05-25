import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSellerReturns,
  fetchSellerReturnById,
  approveSellerReturn,
  rejectSellerReturn,
} from '@/network/returns';

export function useSellerReturns({ status } = {}) {
  return useQuery({
    queryKey: ['seller-returns', status ?? 'all'],
    queryFn:  () => fetchSellerReturns({ limit: 50, status }),
    staleTime: 1000 * 60,
  });
}

export function useSellerReturnById(id) {
  return useQuery({
    queryKey: ['seller-return', id],
    queryFn:  () => fetchSellerReturnById(id),
    enabled:  !!id,
    staleTime: 1000 * 30,
  });
}

export function useReturnActions(id) {
  const qc = useQueryClient();

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['seller-returns'] });
    qc.invalidateQueries({ queryKey: ['seller-return', id] });
  };

  const approve = useMutation({ mutationFn: (note) => approveSellerReturn({ id, note }), onSuccess: invalidate });
  const reject  = useMutation({ mutationFn: (note) => rejectSellerReturn({ id, note }),  onSuccess: invalidate });

  return { approve, reject };
}
