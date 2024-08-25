import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchTokens = (address: string) => {
    const [tokens, setTokens] = useState<string[]>([]);
    const [offeredToken, setOfferedToken] = useState<string>('');
    const [wantedToken, setWantedToken] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://devnet-api.multiversx.com/accounts/${address}/tokens`);
                const tokenIdentifiers = data.map((token: any) => token.identifier);
                setTokens(tokenIdentifiers);
                if (tokenIdentifiers.length > 0) {
                    setOfferedToken(tokenIdentifiers[0]);
                    setWantedToken(tokenIdentifiers[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [address]);

    return { tokens, offeredToken, setOfferedToken, wantedToken, setWantedToken };
};
