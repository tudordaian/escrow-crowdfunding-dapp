import { AuthRedirectWrapper } from "../../wrappers/AuthRedirectWarapper";
import {TokenTransferForm} from "./components/TokenTransferForm.tsx";
import {PaymentList} from "./components/PaymentsList.tsx";
import {useEffect, useState} from "react";
import {AbiRegistry} from "@multiversx/sdk-core/out";

export const Dashboard = () => {
    const [abi, setAbi] = useState<AbiRegistry>();
    useEffect(() => {
        const fetchAbi = async () => {
            const response = await fetch("escrow.abi.json");
            const abiJson = await response.json();
            setAbi(AbiRegistry.create(abiJson));
        };

        fetchAbi();
    }, []);

    return (
        // requireAuth = true??
        <AuthRedirectWrapper>
            <h1 className='text-4xl font-bold text-center my-4'>Dashboard</h1>
            {abi && <TokenTransferForm abi={abi}/>}
            {abi && <PaymentList abi={abi} />}
        </AuthRedirectWrapper>
    );
}