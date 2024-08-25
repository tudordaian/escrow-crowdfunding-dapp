export interface ProposedOfferProps {
    tokens: string[];
    offeredToken: string;
    setOfferedToken: (token: string) => void;
    offeredAmount: string;
    setOfferedAmount: (amount: string) => void;
}
