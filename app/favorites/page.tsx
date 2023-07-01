import React from 'react'
import EmptyState from '../components/EmptyState'

const ListingPage = async() => {
  return (
    <EmptyState 
        title='No Favorites found!'
        subTitle='You have no favorites listings.'
    />
  )
}

export default ListingPage