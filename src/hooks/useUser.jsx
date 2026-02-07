import { useQuery } from "@tanstack/react-query";
import { handleFetchUser } from "@/network/user";
import { getDataInCookie } from "@/data-helpers/auth-session";

export const useUser = () => {
    const token = getDataInCookie("access_token__seller");

    return useQuery({
        queryKey: ["user", token],
        queryFn: async () => {
            const res = await handleFetchUser();
            return res?.data?.data;
        },
        enabled: !!token,
        staleTime: Infinity, // User profile doesn't change often
        cacheTime: Infinity,
        retry: false,
    });
};
