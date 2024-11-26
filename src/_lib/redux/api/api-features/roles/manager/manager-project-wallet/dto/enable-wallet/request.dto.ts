import { Currency, WalletStatus } from "./types";

export type CreateWalletRequestData = {
  balance?: number;
  currency: Currency;
  status?: WalletStatus;
  projectId: string;
};
