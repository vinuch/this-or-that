import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../context/state';
// import { contract } from '../utils/near'

export default function Dash() {
  // const [contract, setcontract] = useState<any>(null);

  // useEffect(() => {
  //   setcontract(window.contract);
  // console.log(window.contract.getPolls())
  // }, [])

  interface Contestant {
    name: string;
    votes: number;
  }
  interface Poll {
    id: string;
    prompt: string;
    contestants: Contestant[];
    participants: string[];
    created: string;
    deadline: string;
    owner: string;
  }

  const list = [1, 2, 3, 4, 5]
  const [loading, setLoading] = useState(false)
  const [polls, setPolls] = useState<Poll[]>([])

  const { contract } = useAppContext()

  const getPolls = useCallback(async () => {
    try {
      setLoading(true);
      setPolls(await contract?.getPolls());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className="pt-20 px-32 ">

      <ul>
        {polls.map(poll => (
          <Link key={poll.id} href={`/polls/${poll.id}`}>
            <li className="transition-all ease-in-out mb-8 rounded-md p-4 border-2 hover:border-8  hover:border-secondary cursor-pointer  flex justify-between items-center">
              <div className="bg-white rounded-md h-64 w-64"></div>
              <div className="text-center">

                <p className="font-bold text-3xl">{poll.contestants.map((contestant, idx) => (
                  <span key={idx}>{contestant.name} {idx == poll.contestants.length - 1 ? '' : ' VS '}</span>
                ))}</p>
                <p className="text-lg font-light mt-2">who would win in a fight?</p>
              </div>
              <div className="bg-white rounded-md h-64 w-64"></div>
            </li>
          </Link>
        ))}



      </ul>
    </div>
  )
}
