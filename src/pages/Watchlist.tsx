import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CryptoBanner from '../components/CryptoBanner'

export type watchlistDataType = {
    id: string,
    max_price: string,
    min_price: string,
    coin_id: {
        id: string,
        rank: number,
        name: string,
        code: string,
        image: string,
        price: string,
        market_cap: string,
        changeIn24: string
    }
}[]
const Watchlist = () => {
    const [loading, setLoading] = useState(false)
    const [watchlistData, setWatchlistData] = useState<watchlistDataType>([])

    const fetchWatchlistData = async () => {
        try {
            setLoading(true)
            await axios.get(`${process.env.REACT_APP_API}/watchlist/all`).then(res => {
                setLoading(false)
                setWatchlistData(res.data.watchlist)
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { fetchWatchlistData() }, [])
    return (
        <div className='container mx-auto'>
            <CryptoBanner banner_headline='Your coins watchlist' banner_description='View your coins in watchlist, ranked by market cap.' />
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="py-3 px-6">
                                Rank
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Coin
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Max_price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Min_price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Market Cap
                            </th>
                            <th scope="col" className="py-3 px-6">
                                24H
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {watchlistData?.map((item, i) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td className="py-4 px-6">{item.coin_id.rank}</td>
                                <td className='py-4 px-6 flex space-x-8'>
                                    <img src={item.coin_id.image} alt="" className='w-10 object-contain' />
                                    <div className='text-xl font-medium'>
                                        <span className='text-gray-800'>{item.coin_id.name}</span> <br /><span className='text-sm uppercase'>{item.coin_id.code}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">{item.coin_id.price}</td>
                                <td className="py-4 px-6">{item.max_price}</td>
                                <td className="py-4 px-6">{item.min_price}</td>
                                <td className="py-4 px-6">{item.coin_id.market_cap} </td>
                                <td className={`py-4 px-6 ${item.coin_id.changeIn24.split('')[0] === '+' ? 'text-primary-base' : 'text-optional'}`}>{item.coin_id.changeIn24}</td>
                            </tr>
                        ))}



                    </tbody>
                </table>
                {loading && <p className='flex flex-col items-center justify-center text-xl my-8'>Loading....</p>}

            </div>
        </div>
    )
}

export default Watchlist