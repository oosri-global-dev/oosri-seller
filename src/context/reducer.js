import { CURRENT_USER, DRAFT_PICKS } from "./types";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        user: payload || undefined,
      };

    default:
      return state;
  }
};
