import React from 'react'
import { BiHeart } from 'react-icons/bi'
import { BsFillHeartFill } from 'react-icons/bs'
import CryptoBanner from '../components/CryptoBanner'

const Watchlist = () => {
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td className="py-4 px-6">1</td>
                            <td className="py-4 px-6">Bitcoint <br />BTC</td>
                            <td className="py-4 px-6">$ 1200</td>
                            <td className="py-4 px-6">$ 1100</td>
                            <td className="py-4 px-6">$ 100</td>
                            <td className="py-4 px-6">$ 1320.2340B </td>
                            {'+2.5%'.split('')[0] === '+' ? <td className="py-4 px-6 text-primary-base">+ 2.5</td> : <td className="py-4 px-6 text-optional">+ 2.5</td>}
                        </tr>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td className="py-4 px-6">2</td>
                            <td className="py-4 px-6">Etherium <br />ETH</td>
                            <td className="py-4 px-6">$ 1200</td>
                            <td className="py-4 px-6">$ 1100</td>
                            <td className="py-4 px-6">$ 100</td>
                            <td className="py-4 px-6">$ 1320.2340B </td>
                            {'-0.5%'.split('')[0] === '+' ? <td className="py-4 px-6 text-primary-base">-0.5%</td> : <td className="py-4 px-6 text-optional">- 0.5%</td>}
                        </tr>



                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Watchlist