import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import { BsFillHeartFill } from 'react-icons/bs'



function CoinListTable() {
    type crypoTypes = {
        rank: number;
        name: string;
        code: string;
        image: string | undefined;
        price: string;
        market_cap: string;
        changeIn24: string;
        crypto_details_link: string | undefined;
    }[];

    const [cryptoList, setCryptoList] = useState<crypoTypes>()
    console.log(cryptoList)

    const fetchCryptos = async () => {
        const res = await axios.get('http://localhost:5000/cryptos/all-list')
        setCryptoList(res.data.data)
    }
    useEffect(() => {
        fetchCryptos()
    }, [])
    return (
        <div className='container mx-auto'>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-2 w-4">

                            </th>
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
                                Market Cap
                            </th>
                            <th scope="col" className="py-3 px-6">
                                24H
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {cryptoList?.map((item, i) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6">
                                    <BsFillHeartFill className='cursor-pointer text-gray-300' title='Add to Favourites' />
                                </td>
                                <td className='py-4 px-6'>{item.rank}</td>
                                <td className='py-4 px-6 flex space-x-8'>
                                    <img src={item.image} alt="" className='w-10 object-contain' />
                                    <p className='text-xl font-medium'>
                                        <span className='text-gray-800'>{item.name}</span> <br /><span className='text-sm uppercase'>{item.code}</span>
                                    </p>
                                </td>
                                <td className='py-4 px-6'>{item.price}</td>
                                <td className='py-4 px-6'>{item.market_cap}</td>
                                {item.changeIn24.split('')[0] === '+' ? <td className="py-4 px-6 text-primary-base">{item.changeIn24}</td> : <td className="py-4 px-6 text-optional">{item.changeIn24}</td>}
                            </tr>
                        ))}

                        {/*                            

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="py-4 px-6">
                                <BiHeart className='cursor-pointer hover:text-optional' />
                            </td>
                            <td className="py-4 px-6">2</td>
                            <td className="py-4 px-6">Etherium <br />ETH</td>
                            <td className="py-4 px-6">$ 1200</td>
                            <td className="py-4 px-6">$ 1320.2340B </td>
                            {'-0.5%'.split('')[0] === '+' ? <td className="py-4 px-6 text-primary-base">-0.5%</td> : <td className="py-4 px-6 text-optional">- 0.5%</td>}
                        </tr> */}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CoinListTable