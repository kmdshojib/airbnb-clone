
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getReservation from '../actions/getReservation'
import ReservationClient from './ReservationClient'

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
            title='Unauthorised'
            subTitle='Please login!'
        />
    }

    const reservations = await getReservation({
        authorId: currentUser.id
    })
    console.log({ reservations })
    if (reservations.length === 0) {
        return <EmptyState
            title='No Reservations'
            subTitle='You have no reservations!'
        />
    }

    return (
        <ReservationClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationsPage