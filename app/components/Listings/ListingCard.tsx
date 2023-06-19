"use client"
import { safeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ListingCardProps {
    currentUSer?: safeUser | null;
    data: Listing;
    reservation?: Reservation;
    onAction: (id: string) => void;
    disabled?: boolean;
    actionId?: string;

}
const ListingCard: React.FC<ListingCardProps> = ({
    currentUSer,
    data,
    reservation,
    onAction,
    disabled,
    actionId

}) => {
    const router = useRouter();
    return (
        <div></div>
    );
}

export default ListingCard;