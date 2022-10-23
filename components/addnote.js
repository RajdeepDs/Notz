import Link from 'next/link'
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
export default function AddNote() {
    return (
        <>
            <Link href={'/add'}>
                <div className='p-3 fixed bg-white shadow-lg items-center w-fit h-fit rounded-full z-50 bottom-10 right-10 cursor-pointer'>
                    <PlusIcon className='w-6' />
                </div>
            </Link>
        </>
    )
}
