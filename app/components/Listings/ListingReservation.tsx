"use clent"
import React from 'react'

import { Range } from "react-date-range"
import Calendar from '../inputs/Calendar';
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Button from '../Button';
interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price, totalPrice, onChangeDate, onSubmit, disabled, disabledDates, dateRange
}) => {
    return (
        <div className=" bg-white roundes-xl border-[1px] border-neutral-200 overflow-hidden">

            <div className='flex flex-row  items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>
                    $ {price}
                </div>

                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disableDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button disabled={disabled} label='Reserved' onClick={onSubmit} />
            </div>
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
        </div>
    )
}

export default ListingReservation