"use client"

import useCountries from "@/app/hooks/useCountries";
import { safeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartBution";

interface ListingCardProps {
    currentUser?: safeUser | null;
    data: Listing;
    reservation?: Reservation;
    onAction: (id: string) => void;
    disabled?: boolean;
    actionId?: string;

}
const ListingCard: React.FC<ListingCardProps> = ({
    currentUser,
    data,
    reservation,
    onAction,
    disabled,
    actionId = ""

}) => {
    const router = useRouter();
    const { getByValues } = useCountries()
    const location = getByValues(data.loactionValue)

    const handleCancle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }
        onAction?.(actionId)

    }, [actionId, disabled, onAction])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price
    }, [reservation, data])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, "PP")} - ${format(end, "PP")}`
    }, [reservation])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                    fill
                    src={data.imageSrc} 
                    alt="Listing"
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingCard;