export type Balance = {
  balance_id: string;
  amount: number;
  units: string;
  purchase: string;
};

export type BalanceList = {
  balances?: Array<Balance>;
};
