import React from 'react'
import { SafeReservation, SafeUser } from '../types'

interface ReservationClientProps{
    reservations: SafeReservation;
    currentUser: SafeUser | null;
}

const ReservationClient:React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
  return (
    <div>ReservationClient</div>
  )
}

export default ReservationClient