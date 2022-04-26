import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import BaseLayout from '../../components/BaseLayout'
import CountDown from '../../components/CountDown'
import Nav from '../../components/Nav'
import { useAppContext } from '../../context/state'
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from '../../components/Notification'

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
export default function Poll() {
  const router = useRouter()
  const { account, contract } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [img1Err, setimg1Err] = useState(false)
  const [img2Err, setimg2Err] = useState(false)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [poll, setPoll] = useState<Poll>()
  const getPoll = useCallback(async () => {
    try {
      setLoading(true);
      let poll = await contract?.getPoll({ id: router.query.pid });
      setPoll(poll);

      if (poll?.participants.includes(account.accountId)) {
        setAlreadyVoted(true)
      }

    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [router.query, account.accountId , contract]);

  useEffect(() => {
    getPoll();
  }, [router.query]);

  const [selected, setselected] = useState<number | null>(null)

  const handleVote = () => {
    setLoading(true)
    contract.vote({ pollId: router.query.pid, contestantIndex: String(selected) }).then(() => {
      toast(<NotificationSuccess text="Vote added successfully." />);
      setLoading(false)

      getPoll()
    }
    ).catch((err: any) => {
      setLoading(false)

      console.log(err)
      toast(<NotificationError text="Failed to add vote" />);
    })
    // setLoading(false)

  }

  const expiredPoll = new Date().getTime() > Number(poll?.deadline);

  return (
    <BaseLayout>
      {
        expiredPoll ? (<p className="text-xl font-bold text-red-600 text-center">This poll is expired !! </p>) : <CountDown time={poll?.deadline || ''} />
      }
      {/* <CountDown time={poll?.deadline || ''}/> */}
      <main className="flex justify-between items-center h-full" style={{ height: '85vh' }}>
        <div className={`bg-primaryLight overflow-hidden rounded-md h-4/6 w-4/12 cursor-pointer ${selected == poll?.contestants.indexOf(poll?.contestants[0]) ? "border border-8 border-secondary" : ""}`} onClick={() => !expiredPoll && !alreadyVoted && setselected(0)}>
          <div className="h-5/6 flex justify-center items-center ">
            {
              poll?.contestants[0].img && !img1Err ? (<img src={poll?.contestants[0].img || "/question-mark.png"} alt="question mark" onError={() => setimg1Err(true)} className="object-cover w-full h-full" />) : (<img src="/question-mark.png" alt="question mark" className="w-64 h-64" />)
            }


          </div>

          <p className="text-center font-bold text-lg mt-4"> {poll?.contestants[0].votes} Votes</p>
        </div>
        <div className="text-center w-3/12">
          <div className="font-extrabold text-5xl -mt-32 break-words"> <p className={`${selected == poll?.contestants.indexOf(poll?.contestants[0]) ? 'text-secondary' : ''}`}>{poll?.contestants[0].name}</p>  <p className="text-lg text-secondary my-6">vs</p> <p className={`${selected == poll?.contestants.indexOf(poll?.contestants[1]) ? 'text-secondary' : ''}`}>{poll?.contestants[1].name}</p></div>

          <p className="text-xl font-light mt-16">{poll?.prompt}</p>

          <p className="text-xs mt-6">(click to choose)</p>

        </div>

        <div className={`bg-primaryLight rounded-md h-4/6 w-4/12 cursor-pointer ${selected == poll?.contestants.indexOf(poll?.contestants[1]) ? "border border-8 border-secondary" : ""}`} onClick={() => !expiredPoll && !alreadyVoted && setselected(1)}>
          <div className="h-5/6 flex justify-center items-center ">
            {
              poll?.contestants[1].img && !img2Err ? (<img src={poll?.contestants[1].img || "/question-mark.png"} alt="question mark" onError={() => setimg2Err(true)} className="object-cover w-full h-full" />) : (<img src="/question-mark.png" alt="question mark" className="rotate-180 w-64 h-64" />)
            }

          </div>

          <p className="text-center font-bold text-lg mt-4"> {poll?.contestants[1].votes} Votes</p>
        </div>

      </main>

      {
        alreadyVoted && !expiredPoll  ? (<p className="text-xl font-bold text-center">Looks like you voted already!</p>) : !expiredPoll && (

          <div className="flex justify-center">
            <button disabled={selected == null || loading} className="px-24 py-3 rounded-md disabled:cursor-not-allowed disabled:opacity-50 bg-secondary " onClick={handleVote}>
              {loading ? (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'transparent', display: 'block' }} width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#85a2b6" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                </circle>
              </svg>) : 'Vote'}

            </button>
          </div>
        )
      }



    </BaseLayout>

  )
}
