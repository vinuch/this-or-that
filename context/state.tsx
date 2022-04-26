import { Contract, WalletConnection } from 'near-api-js';
import React, { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { accountBalance } from '../utils/near';

interface State { account?: any; contract?: any; balance?: string };

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
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    setaccount(window.walletConnection?.account())
    setContract(window.contract)
  }, [])


  const getBalance = useCallback(async () => {
    if (account?.accountId) {
      setBalance(await accountBalance());
    }
  }, [account]);
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const state: State = {
    account,
    contract,
    balance
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