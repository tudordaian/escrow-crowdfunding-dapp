import { useState, useEffect } from "react";
import { AbiRegistry } from "@multiversx/sdk-core/out";

export const useFetchAbi = (url: string) => {
    const [abi, setAbi] = useState<AbiRegistry>();

    useEffect(() => {
        const fetchAbi = async () => {
            const response = await fetch(url);
            const abiJson = await response.json();
            setAbi(AbiRegistry.create(abiJson));
        };
        fetchAbi();
    }, [url]);
    return abi;
};