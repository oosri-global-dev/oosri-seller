import { instance } from "./axios";

export const fetchProductDiscussions = async ({ productId, page = 1 }) => {
  const { data } = await instance.get(`/community/discussions/product/${productId}`, {
    params: { page },
  });
  return data;
};

export const replyToDiscussion = async ({ discussionId, content }) => {
  const { data } = await instance.post(`/community/discussions/${discussionId}/reply/seller`, {
    content,
  });
  return data;
};

export const pinDiscussion = async (discussionId) => {
  const { data } = await instance.patch(`/community/discussions/${discussionId}/pin`);
  return data;
};

export const deleteDiscussion = async (discussionId) => {
  const { data } = await instance.delete(`/community/discussions/seller/${discussionId}`);
  return data;
};
