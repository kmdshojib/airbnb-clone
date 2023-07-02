"use client"
import React, { useCallback, useMemo, useState } from 'react'
import useSearchModal from '@/app/hooks/useSearchModal'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { CountrySelectValue } from '../inputs/CountrySelect'
import queryString from 'query-string'
import { formatISO } from 'date-fns'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const { isOpen, onClose, onOpen } = useSearchModal()

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setbathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
    }), [location])

    const onBack = useCallback(() => {
        setStep(value => value - 1);
    }, [])
    const onNext = useCallback(() => {
        setStep(value => value + 1);
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {}

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }
        const url = queryString.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true });
        setStep(STEPS.LOCATION);
        onClose();
        router.push(url);
    }, [router, step, roomCount, bathroomCount, guestCount, dateRange, onNext, onClose, params, location])



    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onOpen}
            title='Filters'
            actionLabel='Search'
        />
    )
}

export default SearchModal