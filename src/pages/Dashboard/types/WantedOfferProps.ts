export interface WantedOfferProps {
    tokens: string[];
    wantedToken: string;
    setWantedToken: (token: string) => void;
    wantedAmount: string;
    setWantedAmount: (amount: string) => void;
}
