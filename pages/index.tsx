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
        <main className="flex flex-wrap md:flex-nowrap justify-between items-center h-full" style={{ height: '90%' }}>
          <div className="bg-primaryLight rounded-md h-40 md:h-4/6 w-full md:w-4/12 flex justify-center items-center">
            <img src="/question-mark.png" alt="question mark" className="md:w-64 md:h-64 w-24 h-24" />
          </div>
          <div className="text-center w-full md:w-3/12 ">
            <h1 className="font-extrabold text-5xl md:text-7xl md:-mt-40 ">This <span className="text-secondary">OR</span> That</h1>

            <p className="text-sm md:text-xl font-light my-8">Create polls and let people vote to decide!</p>

          </div>
          <div className="bg-primaryLight rounded-md h-40 md:h-4/6 w-full md:w-4/12 flex justify-center items-center">
            <img src="/question-mark.png" alt="question mark" className="rotate-180 md:w-64 md:h-64 w-24 h-24" />
          </div>

        </main>

        <footer>
          <p className="text-center ">Created by <a className="underline" href={`https://twitter.com/dev_vince_`} target="_blank" rel="noreferrer" >dev_vince</a>  </p>
        </footer>

      </div>)}
    </BaseLayout>


  )
}


export default Home
