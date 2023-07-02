import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (<EmptyState
            title='Unauthorized'
            subTitle='Please log in!'
        />)
    }
    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (<EmptyState
            title='No Properties found!'
            subTitle="Looks like You have no properties!"
        />)
    }
    return (
        <div>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </div>
    )
}

export default TripsPage;