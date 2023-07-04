'use client';
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi"
import useCountries from './../../hooks/useCountries';
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
const Search = () => {

    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValues } = useCountries()

    const loactionValue = params?.get('loactionValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if (loactionValue) {
            return getByValues(loactionValue as string)?.lable;
        }
        return "Anywhere"
    }, [loactionValue, getByValues])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);

            let diff = differenceInDays(start, end);

            if (diff === 0) {
                diff = 1;
            }
            return `${diff} Days`;
        }
        return "Any week"
    }, [endDate, startDate])
    const guestCountLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }
        return "Add Guests"
    }, [guestCount])

    return (
        <div
            onClick={searchModal.onOpen}
            className="
    border-[1px] 
    w-full 
    md:w-auto 
    py-2 
    rounded-full 
    shadow-sm 
    hover:shadow-md 
    transition 
    cursor-pointer
    "
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">{locationLabel}</div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{guestCountLabel}</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search