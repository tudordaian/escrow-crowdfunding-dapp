import axios from "axios";
import {formatAmount} from "@multiversx/sdk-dapp/utils";

export const hasEnoughBalance = async (address: string, token: string, amount: string): Promise<{balance: number,hasEnough: boolean}> => {
    const {data} = await axios.get(`https://devnet-api.multiversx.com/accounts/${address}/tokens/${token}`);
    const balance = parseFloat(formatAmount({input: data.balance}));
    return { balance, hasEnough: balance >= parseFloat(amount) };
}