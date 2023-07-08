"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartBution";
import Button from "../Button";


interface ListingCardProps {
    currentUser: SafeUser | null;
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;

}
const ListingCard: React.FC<ListingCardProps> = ({
    currentUser,
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = ""

}) => {
    const router = useRouter();
    const { getByValues } = useCountries()
    const location = getByValues(data.loactionValue)

    const handleCancle = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

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
                <div className="font-semibold text-lg">
                    {location?.region},{location?.lable}
                </div>

                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>

                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reservation && (
                        <div className="font-light">
                            night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        onClick={handleCancle}
                        disabled={disabled}
                        small
                        label={actionLabel}
                    />
                )}
            </div>
        </div>
    );
}

export default ListingCard;