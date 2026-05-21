import { instance } from './axios';

export const fetchNotifications = async ({ skip = 0, limit = 20 } = {}) => {
  const { data } = await instance.get('/seller/notifications', { params: { skip, limit } });
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await instance.patch(`/seller/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await instance.patch('/seller/notifications/read-all');
  return data;
};

export const deleteNotification = async (id) => {
  const { data } = await instance.delete(`/seller/notifications/${id}`);
  return data;
};
