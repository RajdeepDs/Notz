import React from 'react'

export default function Notes({ children, avatar, username, title, description }) {
    return (
        <div className='mx-8 bg-white shadow-lg rounded-lg px-6 py-3 space-y-2 mb-4'>
            <h2 className='font-semibold text-xl '>{title}</h2>
            <p className="line-clamp-3">{description} </p>
            {children}
        </div>
    )
}
