import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/state';
import { login, logout } from "../utils/near";

interface NavProps {

}



export default function Nav({ }: NavProps) {
  const { account } = useAppContext()

  return (
    <div className="flex justify-between mb-">
      <Link href="/">
        <h2 className="font-bold cursor-pointer">This-OR-That</h2>
      </Link>
      {
        account?.accountId ?
          (<button className="bg-secondary px-6 py-2 rounded-md font-bold" onClick={logout}>logout</button>)
          :
          (<button className="bg-secondary px-6 py-2 rounded-md font-bold" onClick={login}>connect wallet</button>)
      }

    </div>
  )
}
