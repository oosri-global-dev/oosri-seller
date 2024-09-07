import { isEmpty } from "lodash";

export const isBusinessActive = (user) => {
  if (user?.businessType === "Personal") {
    if (isEmpty(user?.personalBusinessAccount)) {
      return false;
    }
  } else if (user?.businessType === "Corporate") {
    if (isEmpty(user?.corporateBusinessAccount)) {
      return false;
    }
  }

  return true;
};
