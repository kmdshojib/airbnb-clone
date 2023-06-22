"use client"
import Container from '@/app/components/Container';
import {categories} from '@/app/components/NavBar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import React, { useMemo } from 'react'

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
                </div>
            </div>
       </Container>
    )
}

export default ListingClient