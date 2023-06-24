"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '@/app/components/Container';
import { categories } from '@/app/components/NavBar/Categories';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import ListingHead from './../../components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLogInModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/Listings/ListingReservation';


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
}

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser,
    reservations = []
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();
    const disableDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsLoading(true);

        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success("Listing reserved")
                setDateRange(initialDateRange)
                // redirect to trips

                router.refresh()
            })
            .catch((error) => {
                toast.error(`something went wrong ${error.message}`)
            })
    }, [loginModal, router, currentUser, dateRange, listing, totalPrice])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }


    }, [listing, dateRange])

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
                        <div className='order-first mb-10 md:order-last md:col-span-3 '>
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disableDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient