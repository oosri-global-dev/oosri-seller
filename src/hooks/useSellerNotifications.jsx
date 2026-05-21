import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '@/network/notifications';

const QUERY_KEY = ['seller-notifications'];

export function useSellerNotifications() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchNotifications({ skip: 0, limit: 30 }),
    refetchInterval: 30_000,
    staleTime: 20_000,
    select: (data) => ({
      notifications: data?.body?.notifications ?? [],
      unreadCount: data?.body?.unreadCount ?? 0,
    }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: QUERY_KEY });

  const markRead    = useMutation({ mutationFn: markNotificationRead,    onSuccess: invalidate });
  const markAllRead = useMutation({ mutationFn: markAllNotificationsRead, onSuccess: invalidate });
  const remove      = useMutation({ mutationFn: deleteNotification,       onSuccess: invalidate });

  return {
    notifications: query.data?.notifications ?? [],
    unreadCount:   query.data?.unreadCount ?? 0,
    isLoading:     query.isLoading,
    markRead:    (id) => markRead.mutate(id),
    markAllRead: ()   => markAllRead.mutate(),
    remove:      (id) => remove.mutate(id),
  };
}
