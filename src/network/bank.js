import { instance } from "./axios";

export const getBanks = async () => {
    const { data } = await instance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bank`
    );
    return data;
};

export const resolveBankAccount = async ({ account_number, bank_code }) => {
    const { data } = await instance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`
    );
    return data;
};
