import { instance } from './axios';

export const fetchSellerReturns = async ({ skip = 0, limit = 50, status } = {}) => {
  const params = { skip, limit };
  if (status) params.status = status;
  const { data } = await instance.get('/seller/returns', { params });
  return data;
};

export const fetchSellerReturnById = async (id) => {
  const { data } = await instance.get(`/seller/returns/${id}`);
  return data;
};

export const approveSellerReturn = async ({ id, note }) => {
  const { data } = await instance.patch(`/seller/returns/${id}/approve`, { note });
  return data;
};

export const rejectSellerReturn = async ({ id, note }) => {
  const { data } = await instance.patch(`/seller/returns/${id}/reject`, { note });
  return data;
};
