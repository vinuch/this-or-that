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
    img: string;
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
  }, [contract]);

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className="pt-20 md:px-32 ">
      {/* {console.log(polls)} */}
      {!polls.length ? <div className="text-center font-bold text-4xl">No polls yet</div> : (
        <ul>
          {polls.map(poll => (
            <Link key={poll.id} href={`/polls/${poll.id}`}>
              <li className="transition-all ease-in-out mb-8 rounded-md p-4 border-2 hover:border-8  hover:border-secondary cursor-pointer  flex justify-between items-center">
                <div className="bg-white rounded-md md:h-64 md:w-64 h-24 w-24 overflow-hidden">
                  <img src={poll?.contestants[0]?.img} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="text-center px-2">

                  <p className="font-bold md:text-3xl">{poll.contestants.map((contestant, idx) => (
                    <span key={idx}>{contestant.name} {idx == poll.contestants.length - 1 ? '' : <span className="font-bold text-xl"> vs </span>}</span>
                  ))}</p>
                  <p className="text-sm md:text-lg font-light mt-2">{poll.prompt}</p>
                  <p className="text-sm font-extrabold mt-4">votes</p>
                  <p className="text-2xl mt-4"><span className="mx-4">{poll.contestants[0]?.votes}</span> - <span className="mx-4">{poll.contestants[1]?.votes}</span> </p>
                  <p className="text-sm md:text-base text-secondary mt-6">by {poll.owner}</p>
                </div>
                <div className="bg-white rounded-md md:h-64 md:w-64 h-24 w-24 overflow-hidden">
                  <img src={poll?.contestants[1]?.img} alt="" className="h-full w-full object-cover" />
                </div>
              </li>
            </Link>
          ))}



        </ul>
      )}

    </div>
  )
}
