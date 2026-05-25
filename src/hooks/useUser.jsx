import { useQuery } from "@tanstack/react-query";
import { handleFetchUser } from "@/network/user";
import { getDataInCookie } from "@/data-helpers/auth-session";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getDataInCookie("access_token__seller"));
    }, []);

    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await handleFetchUser();
            return res?.data?.data;
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 1,
    });
};

