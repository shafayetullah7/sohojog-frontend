import { Currency, WalletStatus } from "./types";

export type CreateWalletRequestData = {
  balance?: number;
  currency: Currency;
  estimatedBudget: number;
  status?: WalletStatus;
  projectId: string;
};
