import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout'
import Nav from '../../components/Nav'

export default function Poll() {
  const [selected, setselected] = useState<string | null>(null)
  
  return (
    <BaseLayout>

      <main className="flex justify-between items-center h-full" style={{ height: '85vh' }}>
        <div className={`bg-primaryLight rounded-md h-4/6 w-4/12 flex justify-center items-center cursor-pointer ${selected == "superman" ? "border border-8 border-secondary" : ""}`} onClick={() => setselected("superman")}>
          <img src="/question-mark.png" alt="question mark" className="w-64 h-64" />
        </div>
        <div className="text-center w-3/12">
          <div className="font-extrabold text-5xl -mt-32 break-words"> <p className={`${selected == "superman" ? 'text-secondary': ''}`}>Superman</p>  <p className="text-lg text-secondary my-6">vs</p> <p className={`${selected == "batman" ? 'text-secondary': ''}`}>Batman</p></div>

          <p className="text-xl font-light mt-16">who would win in a fight?</p>

          <p className="text-xs mt-6">(click to choose)</p>

        </div>
        <div className={`bg-primaryLight rounded-md h-4/6 w-4/12 flex justify-center items-center cursor-pointer ${selected == "batman" ? "border border-8 border-secondary" : ""}`}onClick={() => setselected("batman")}>
          <img src="/question-mark.png" alt="question mark" className="rotate-180 w-64 h-64" />
        </div>

      </main>

      <div className="flex justify-center">
        <button disabled={selected == null} className="px-24 py-3 rounded-md disabled:cursor-not-allowed disabled:opacity-50 bg-secondary ">Vote</button>
      </div>

    </BaseLayout>

  )
}
