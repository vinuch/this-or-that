import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.css'
import Dash from "../components/Dash"
import BaseLayout from '../components/BaseLayout'
import { useAppContext } from '../context/state'

const Home: NextPage = () => {
  const { account } = useAppContext()



  return (
    <BaseLayout>
      {/* {account?.accountId} */}

      {account?.accountId ? (<Dash />) : (<div className=" h-screen">
        <main className="flex justify-between items-center h-full" style={{ height: '90%' }}>
          <div className="bg-primaryLight rounded-md h-4/6 w-4/12 flex justify-center items-center">
            <img src="/question-mark.png" alt="question mark" className="w-64 h-64" />
          </div>
          <div className="text-center">
            <h1 className="font-extrabold text-7xl -mt-40 ">This <span className="text-secondary">OR</span> That</h1>

            <p className="text-xl font-light my-8">let the polls decide!</p>

          </div>
          <div className="bg-primaryLight rounded-md h-4/6 w-4/12 flex justify-center items-center">
            <img src="/question-mark.png" alt="question mark" className="rotate-180 w-64 h-64" />
          </div>

        </main>

        <footer>
          <p className="text-center">Created by dev_vince </p>
        </footer>

      </div>)}
    </BaseLayout>


  )
}

export default Home
