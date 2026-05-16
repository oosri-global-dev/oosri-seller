import { instance, formInstance } from './axios';

export const getMyKyc = async () => {
  const { data } = await instance.get('/seller/kyc');
  return data;
};

export const submitKyc = async (formData) => {
  const { data } = await formInstance.post('/seller/kyc', formData);
  return data;
};
