import Link from 'next/link'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/state';
import { login, logout } from "../utils/near";
import { Menu, Transition, Dialog } from '@headlessui/react'
import { } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import { NotificationError, NotificationSuccess } from './Notification';
import { v4 as uuid4 } from "uuid";
import { useForm } from "react-hook-form";

interface NavProps {

}

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
  created?: string;
  deadline: string;
  owner?: string;
}

interface PollForm {
  prompt: string;
  name1: string;
  imgurl1: string;
  name2: string;
  imgurl2: string;
  deadline: string;
}


export default function Nav({ }: NavProps) {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { account, balance, contract } = useAppContext()
  const minimumDeadline = String(Date.now() + (24 * 60 * 60 * 1000))
  const [poll, setPoll] = useState<Poll>({
    id: '',
    prompt: '',
    contestants: [],
    participants: [],
    deadline: minimumDeadline,
  })
  let [isOpen, setIsOpen] = useState(false)
  let [loading, setLoading] = useState(false)
  let [contestant1, setcontestant1] = useState({ name: '', votes: 0, img: '' })
  let [contestant2, setcontestant2] = useState({ name: '', votes: 0, img: '' })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  //   {
  //     "prompt": "test",
  //     "name1": "test",
  //     "imgurl1": "terst",
  //     "name2": "TEST",
  //     "imgurl2": "STEA",
  //     "deadline": "2022-04-26T14:24:51.379"
  // }
  const onSubmit = (data: { [x: string]: any; }) => {
    setLoading(true)
    setPoll({ ...poll, prompt: data.prompt, deadline: String(Date.parse(data.deadline)), contestants: [{ name: data.name1, votes: 0, img: data.imgurl1 }, { name: data.name2, votes: 0, img: data.imgurl2 }] })

    contract.setPoll({ poll: { ...poll, ...{ prompt: data.prompt, deadline: String(Date.parse(data.deadline)), contestants: [{ name: data.name1, votes: 0, img: data.imgurl1 }, { name: data.name2, votes: 0, img: data.imgurl2 }] }, id: uuid4() } }).then(() => {
      toast(<NotificationSuccess text="Poll Created successfully." />);
      setLoading(false)
      if (router.pathname !== '/') {
        router.push('/')
      } else {
        router.reload()
      }
    }
    ).catch((err: any) => {
      setLoading(false)

      console.log(err)
      toast(<NotificationError text="Failed to create poll" />);
    })
  };



  useEffect(() => {


  }, [errors])


  return (
    <div className="flex justify-between">
      <Link href="/" passHref>
        <h2 className="font-bold cursor-pointer">This-OR-That</h2>
      </Link>
      {
        account?.accountId ?
          (<div className="flex items-center">

            <button className="bg-secondary px-6  py-2 rounded-md font-bold" onClick={openModal}>Create Poll</button>
            {/* <Transition appear show={isOpen} as={Fragment}> */}
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
              open={isOpen}
            >
              <div className="min-h-screen px-4 text-center">
                {/* <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                > */}
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                {/* </Transition.Child> */}

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                {/* <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                > */}
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a poll
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        Fill in the details of your poll
                      </p>
                      <div className="mb-2">
                        <label htmlFor="prompt" className="text-sm font-semibold">Prompt </label>
                        <input type="text" id="prompt" className="w-full my-2 border border-gray-500 rounded-md p-2" {...register("prompt", { required: true })} defaultValue={poll.prompt} />
                        {errors.prompt && <span className="text-sm text-red-400 font-light">This field is required</span>}
                      </div>

                      <div className="mb-2">
                        <label htmlFor="name1" className="text-sm font-semibold">Name (Contestant 1) </label>
                        <input type="text" id="name1" className="w-full my-2 border border-gray-500 rounded-md p-2"{...register("name1", { required: true })} defaultValue={contestant1.name} />
                        {errors.name1 && <span className="text-sm text-red-400 font-light">This field is required</span>}

                      </div>
                      <div className="mb-2">
                        <label htmlFor="imgurl1" className="text-sm font-semibold">Image URL (Contestant 1) </label>
                        <input type="text" id="imgurl1" className="w-full my-2 border border-gray-500 rounded-md p-2"{...register("imgurl1", { required: true })} defaultValue={contestant1.img} />
                        {errors.imgurl1 && <span className="text-sm text-red-400 font-light">This field is required</span>}

                      </div>
                      <div className="mb-2">
                        <label htmlFor="name2" className="text-sm font-semibold">Name (Contestant 2) </label>
                        <input type="text" id="name2" className="w-full my-2 border border-gray-500 rounded-md p-2"{...register("name2", { required: true })} defaultValue={contestant2.name} />
                        {errors.name2 && <span className="text-sm text-red-400 font-light">This field is required</span>}

                      </div>
                      <div className="mb-2">
                        <label htmlFor="imgurl2" className="text-sm font-semibold">Image URL (Contestant 2) </label>
                        <input type="text" id="imgurl2" className="w-full my-2 border border-gray-500 rounded-md p-2"{...register("imgurl2", { required: true })} defaultValue={contestant2.img} />
                        {errors.imgurl2 && <span className="text-sm text-red-400 font-light">This field is required</span>}

                      </div>
                      <div className="mb-2">
                        <label className="text-sm font-semibold" htmlFor="deadline">Deadline (date and time):</label>
                        <input type="datetime-local" id="deadline" className="w-full my-2 border border-gray-500 rounded-md p-2"{...register("deadline", { required: true, validate: value => new Date(value).getTime() >= Number(minimumDeadline) - 5 * 60 * 60 * 1000 })} defaultValue={new Date(Number(poll.deadline)).toISOString().replace('Z', '')} />
                        {errors.deadline && <span className="text-sm text-red-400 font-light">This deadline should be at least 24 hours from now </span>}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full justify-center px-4 py-4 text-sm font-medium text-white bg-secondary bg-opacity-70 border border-transparent rounded-md hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      // onClick={handleCreatePoll}
                      >
                        {loading ? (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'transparent', display: 'block' }} width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                          <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#85a2b6" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                          </circle>
                        </svg>) : 'Create Poll'}

                      </button>
                    </div>
                  </form>
                </div>
                {/* </Transition.Child> */}
              </div>
            </Dialog>
            {/* </Transition> */}

            <div className="w-40 text-right  top-16">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    NEAR {balance}
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                {/* <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                > */}
                <Menu.Items className="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <a href={`https://explorer.testnet.near.org/accounts/${account?.accountId}`} target="_blank" rel="noreferrer" >
                          <button
                            className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >

                            {account?.accountId}
                          </button>
                        </a>

                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            router.push('/'); setTimeout(() => {
                              logout()
                            }, 1000);
                          }}
                          className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >

                          Disconnect
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                </Menu.Items>
                {/* </Transition> */}
              </Menu>
            </div>




          </div>)
          :
          (<button className="bg-secondary px-6 py-2 rounded-md font-bold" onClick={login}>connect wallet</button>)
      }

    </div>

  )
}
