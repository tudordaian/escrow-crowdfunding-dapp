import axios from "axios";
import {formatAmount} from "@multiversx/sdk-dapp/utils";

export const hasEnoughBalance = async (address: string, token: string, amount: string): Promise<boolean> => {
    const {data} = await axios.get(`https://devnet-api.multiversx.com/accounts/${address}/tokens/${token}`);
    const balance = data.balance;
    return parseFloat(formatAmount({input: balance})) >= parseFloat(amount);
}