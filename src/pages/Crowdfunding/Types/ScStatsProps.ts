export interface ScStatsProps {
    scStatus: string;
    scTokenId: string;
    scTarget: string;
    scCurrentSum: string;
    scYourDeposit: string;
    refreshStats: () => void;
}