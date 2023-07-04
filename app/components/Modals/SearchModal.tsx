"use client"
import React, { useCallback, useMemo, useState } from 'react'
import useSearchModal from '@/app/hooks/useSearchModal'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import queryString from 'query-string'
import { formatISO, set } from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'


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
            loactionValue: location?.value,
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

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }

        return "Next"
    }, [step])

    const seconderyActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Previous";
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Where do you want to go?'
                subTitle='Find the perfect location!'
            />

            <CountrySelect
                value={location}
                onChange={value => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you plan to go?'
                    subTitle='Make sure everyone id free!'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='More Infornation'
                    subTitle='Find Your perfect place!'
                />
                <Counter
                    title="Guests"
                    subtitle='How many guests are comming?'
                    value={guestCount}
                    onChange={value => setGuestCount(value)}
                />
                <Counter
                    title="Room"
                    subtitle='How many room do you need?'
                    value={roomCount}
                    onChange={value => setRoomCount(value)}
                />
                <Counter
                    title="Bathroom"
                    subtitle='How many bathroom do you need?'
                    value={bathroomCount}
                    onChange={value => setbathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title='Filters'
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            seconderyActionLabel={seconderyActionLabel}
            body={bodyContent}
        />
    )
}

export default SearchModal