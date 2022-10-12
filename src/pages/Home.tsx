import React from 'react'
import CoinListTable from '../components/CoinListTable'
import CryptoBanner from '../components/CryptoBanner'
import Nav from '../components/Nav'

const Home = () => {
    return (
        <div>
            <CryptoBanner banner_headline='Cryptocurrency price list' banner_description='All cryptocurrencies ranked by market cap.' />
            <CoinListTable />
        </div>
    )
}

export default Home