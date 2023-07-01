import React from 'react'
import EmptyState from '../components/EmptyState'
import getFavouriteListings from '../actions/getFavoriteListings'
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <EmptyState
                title='No Favorites found!'
                subTitle='You have no favorites listings.'
            />
        )
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default ListingPage