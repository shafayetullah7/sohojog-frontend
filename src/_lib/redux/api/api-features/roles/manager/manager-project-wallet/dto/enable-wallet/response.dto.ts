import { Currency, WalletStatus } from "./types";

export type Wallet = {
  id: string;
  estimatedBudget: number;
  balance: number;
  currency: Currency;
  status: WalletStatus;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WalletResponseData = {
  wallet: Wallet;
};
