
import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState';
import getReservation from '../actions/getReservation';
import TripsClient from './TripsClient';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (<EmptyState
            title='Unauthorized'
            subTitle='Please log in!'
        />)
    }
    const reservations = await getReservation({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (<EmptyState
            title='No Trips found!'
            subTitle="Looks like You haven't made any Trips!"
        />)
    }
    return (
        <div>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    )
}

export default TripsPage;