'use client'
import Image from 'next/image'
import React from 'react'
const Avatar = () => {
    return (
        <Image
            className='rounded-full'
            height="30"
            width="30"
            alt="Profile Image"
            src="/images/placeholder.png"
        />
    )
}

export default Avatar