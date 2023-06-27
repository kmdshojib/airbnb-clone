"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";

interface TripsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser[];
}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
  return (
    <Container>
        <Heading 
            title="Trips"
            subTitle="Where have you been and What are you going?"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

        </div>
    </Container>
  )
}

export default TripsClient