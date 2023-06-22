"use client"
import React, { useMemo } from 'react'
import Container from '@/app/components/Container';
import { categories } from '@/app/components/NavBar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import ListingHead from './../../components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser
}) => {
    const category = useMemo(() => {
        return categories.find((item: any) => item.label === listing.category)
    }, [listing.category])
    const { description, user, roomCount, guestCount, bathRoomCount, loactionValue } = listing
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.loactionValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={user}
                            category={category}
                            description={description}
                            roomCount={roomCount}
                            guestCount={guestCount}
                            bathroomCount={bathRoomCount}
                            locationValue={loactionValue}

                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient