export interface CrowdfundingDashboardProps {
    tokens: string[];
    offeredToken: string;
    setOfferedToken: (token: string) => void;
    setAmount: (amount: string) => void;
    handleSubmit: (func: string) => void;
}