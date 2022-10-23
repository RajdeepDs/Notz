import React from 'react'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { IdentificationIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function Nav() {
    const [user, loading] = useAuthState(auth);
    console.log(user);
    return (
        <div>
            <div className="flex z-50 justify-between py-4 px-3">
                <h2 className='font-medium text-[24px]'>All Notes</h2>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center  shadow-sm">
                            <img src={user?.photoURL} className='w-[42px] rounded-full' />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className="flex items-center gap-2 px-2 py-2">
                                            <IdentificationIcon className='w-6' />
                                            <div className="flex flex-col">

                                                <h2 className="text-sm">{user?.displayName}</h2>
                                                <span className='text-sm'>{user?.email}</span>
                                            </div>
                                        </div>
                                    )}
                                </Menu.Item>
                                <hr className='mx-2' />
                                <form method="POST" action="#">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href={'/auth/login'}>
                                                <button
                                                    type="submit"
                                                    onClick={(async () => auth.signOut())}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'w-full px-2 py-2 text-left gap-2 text-sm flex '
                                                    )}
                                                >
                                                    <ArrowLeftOnRectangleIcon className='w-6' />
                                                    Sign out
                                                </button>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </form>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div >
    )
}
