import { CreateBusinessWrapper } from "./index.styles";
import PersonalBusiness from "./sections/personal-business";
import { useMainContext } from "@/context";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import CustomLoader from "@/components/lib/CustomLoader";
import CorporateBusiness from "./sections/corporate-business";
import { BsArrowLeft as LeftArrow } from "react-icons/bs";

export default function CreateBusiness() {
  const {
    state: { user },
  } = useMainContext();
  const [userBusinessType, setUserBusinessType] = useState("");
  const { push, back } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      push("/");
      return;
    }

    if (user?.businessType === "Personal" || user?.businessType === "Corporate") {
      if (user.businessType === "Corporate") {
        if (isEmpty(user?.corporateBusinessAccount)) {
          setUserBusinessType("Corporate");
          setIsLoading(false);
          return;
        }
        push("/dashboard");
        return;
      }

      if (user.businessType === "Personal") {
        if (isEmpty(user?.personalBusinessAccount)) {
          setUserBusinessType("Personal");
          setIsLoading(false);
          return;
        }
        push("/dashboard");
        return;
      }
    }

    setIsLoading(false);
  }, [user, push]);

  return (
    <CreateBusinessWrapper>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="page__header">
            <div className="back__row" onClick={() => back()}>
              <LeftArrow size={16} className="back__icon" />
              <span className="back__label">Back</span>
            </div>
            <div className="title__block">
              <h1>Create Business Account</h1>
              {userBusinessType && (
                <span className="type__badge">{userBusinessType}</span>
              )}
            </div>
            <p className="subtitle">
              Complete your business profile to start selling on Oosri
            </p>
          </div>

          {userBusinessType === "Personal" && <PersonalBusiness />}
          {userBusinessType === "Corporate" && <CorporateBusiness />}
        </>
      )}
    </CreateBusinessWrapper>
  );
}
