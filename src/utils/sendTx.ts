import {Transaction} from "@multiversx/sdk-core/out";
import {sendTransactions} from "@multiversx/sdk-dapp/services";

export const sendTx = async (tx: Transaction, address: string) => {
    if (!address || !tx) {
        console.error("Address or transaction not found");
        return;
    }
    await sendTransactions({
        transactions: [tx],
        transactionsDisplayInfo: {
            processingMessage: "Processing transaction",
            errorMessage: "An error has occured",
            successMessage: "Transaction successful",
        },
        signWithoutSending: false,
    });
};