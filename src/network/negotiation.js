import { instance } from "./axios";

export const fetchSellerNegotiations = async ({ status, page = 1 } = {}) => {
  const params = { page };
  if (status) params.status = status;
  const { data } = await instance.get(`/community/negotiations/seller`, { params });
  return data;
};

export const counterNegotiation = async ({ negotiationId, counterPrice, note }) => {
  const { data } = await instance.post(`/community/negotiations/${negotiationId}/counter`, {
    counterPrice,
    note,
  });
  return data;
};

export const acceptNegotiation = async (negotiationId) => {
  const { data } = await instance.post(`/community/negotiations/${negotiationId}/accept/seller`);
  return data;
};

export const rejectNegotiation = async ({ negotiationId, note }) => {
  const { data } = await instance.post(`/community/negotiations/${negotiationId}/reject/seller`, {
    note,
  });
  return data;
};
