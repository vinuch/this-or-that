import { Contract, WalletConnection } from 'near-api-js';
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from '../context/state';
import Nav from './Nav'
import { Notification } from './Notification';

interface BaseLayoutProps {
    children: React.ReactNode
}

declare const window: {
    walletConnection: WalletConnection;
    accountId: any;
    contract: Contract;
    location: any;
  };



export default function BaseLayout({ children }: BaseLayoutProps) {
    const router = useRouter()
    const { account } = useAppContext()

    useLayoutEffect(() => {
        if (!window.walletConnection.account().accountId) {
            router.push('/')
        }
    }, [])


    return (
        <div className="bg-primary min-h-screen p-6 text-white ">
            <Nav />
            <Notification />
            {children}
        </div>
    )
}
