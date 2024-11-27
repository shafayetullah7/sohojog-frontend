export const Currencies = {
  USD: "USD", // United States Dollar
  EUR: "EUR", // Euro
  GBP: "GBP", // British Pound
  JPY: "JPY", // Japanese Yen
  AUD: "AUD", // Australian Dollar
  CAD: "CAD", // Canadian Dollar
  INR: "INR", // Indian Rupee
  CNY: "CNY", // Chinese Yuan
  CHF: "CHF", // Swiss Franc
  NZD: "NZD", // New Zealand Dollar
  BDT: "BDT", // Bangladesh Taka
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies];

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED", // Add other statuses as needed
}
