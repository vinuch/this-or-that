import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from '../context/state';
import Nav from './Nav'


interface BaseLayoutProps {
    children: React.ReactNode
}




export default function BaseLayout({ children }: BaseLayoutProps) {
    const router = useRouter()
    const { account } = useAppContext()

    useLayoutEffect(() => {
        if (!account?.accountId) {
            router.push('/')
        }
    }, [])


    return (
        <div className="bg-primary min-h-screen p-6 text-white ">
            <Nav />
            {children}
        </div>
    )
}
