import { useQueryClient } from "@tanstack/react-query";
import { toggleProductVisibility } from "@/network/product";

export const useToggleVisibility = (setToggleLoading, setTempProducts) => {
  const queryClient = useQueryClient();

  const handleToggle = (checked, obj) => {
    const id = obj._id;

    setTempProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, isVisible: checked } : product
      )
    );

    setToggleLoading((prev) => ({ ...prev, [id]: true }));

    toggleProductVisibility(id, { isVisible: checked })
      .then(() => {
        setTimeout(() => {
          queryClient.invalidateQueries(["products"]);
        }, 500);
      })
      .catch((error) => {
        console.error("Toggle visibility failed:", error);

        setTempProducts((prev) =>
          prev.map((product) =>
            product._id === id ? { ...product, isVisible: !checked } : product
          )
        );
      })
      .finally(() => {
        setToggleLoading((prev) => ({ ...prev, [id]: false }));
      });
  };

  return handleToggle;
};
