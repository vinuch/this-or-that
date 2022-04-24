import { WalletConnection } from "near-api-js";

export {};

declare global {
    interface Window {
        walletConnection?: WalletConnection;
        accountId?: any;
        contract?: any;
    }
  }