import { Contract, WalletConnection } from 'near-api-js';
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';

interface State { account?: any; contract?: any };

declare const window: {
  walletConnection: WalletConnection;
  accountId: any;
  contract: Contract;
  location: any;
};

const AppContext = createContext<State>({});

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [account, setaccount] = useState<any>(null)
  const [contract, setContract] = useState<any>(null)

  useEffect(() => {
    setaccount(window.walletConnection?.account())
    setContract(window.contract)
  }, [])

  const state: State = {
    account,
    contract
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}