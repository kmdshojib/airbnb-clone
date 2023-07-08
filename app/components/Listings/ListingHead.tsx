"use client"
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartBution';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title, locationValue, imageSrc, id, currentUser
}) => {
    const { getByValues } = useCountries();
    const location = getByValues(locationValue)
    return (
        <div>
            <Heading
                title={title}
                subTitle={`${location?.region}, ${location?.lable}`}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image
                    alt="Iamge"
                    src={imageSrc}
                    fill
                    className='object-cover w-full mt-5'
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </div>
    )
}

export default ListingHead