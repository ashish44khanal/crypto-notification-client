import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BiHeart, BiSearch } from 'react-icons/bi'
import { BsFillHeartFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5';
import CryptoBanner from './CryptoBanner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function CoinListTable() {

    type crypoTypes = {
        id: string;
        rank: number;
        name: string;
        code: string;
        image: string | undefined;
        price: string;
        market_cap: string;
        changeIn24: string;
        crypto_details_link: string | undefined;
        recordInWatchlist: boolean;
    }[];

    const [cryptoList, setCryptoList] = useState<crypoTypes>()
    const [loading, setLoading] = useState('');
    const [searchText, setSearchText] = useState('');

    // context 
    const [userLoggedIn] = useContext(AuthContext)

    //navigate
    const navigate = useNavigate()

    // watchlist related states 
    const [watchlistLoading, setwatchlistLoading] = useState(false);
    const [currentItemID, setCurrentItemID] = useState('')
    const initialApiResState = {
        type: '',
        msg: ''
    }
    const [watchlistApiRes, setWatchlistApiRes] = useState(initialApiResState)
    console.log(watchlistApiRes)
    const handleSearch = (value: string) => {
        setSearchText(value)
    }

    const fetchCryptos = async () => {
        try {
            setLoading("true")
            const res = await axios.get(`${process.env.REACT_APP_API}/cryptos/all-list${searchText && `?name=${searchText}`}`)
            setCryptoList(res.data.data)
            setLoading("false")
        } catch (error) {
            console.log(error)
        }
    }

    const addToWatchlist = async (coin_id: string) => {
        try {
            if (userLoggedIn.status === false) {
                navigate('/login')
            }
            setCurrentItemID(coin_id)
            setwatchlistLoading(true)
            await axios.post(`${process.env.REACT_APP_API}/watchlist/add`, {
                coin_id: `${coin_id}`
            }).then(res => {
                setwatchlistLoading(false)
                setWatchlistApiRes({
                    type: "success",
                    msg: res.data.msg
                })
                setTimeout(() => {
                    setWatchlistApiRes(initialApiResState)
                }, 3000);
            })
        } catch (error: any) {
            setwatchlistLoading(false)
            if (error.response.data) {
                setWatchlistApiRes({
                    type: 'error',
                    msg: error.response.data.message
                })
                setTimeout(() => {
                    setWatchlistApiRes(initialApiResState)
                }, 3000);
            }
        }
    }
    useEffect(() => {
        const getData = setTimeout(() => {
            fetchCryptos()
        }, 500);
        return () => clearTimeout(getData)

    }, [searchText, watchlistApiRes, userLoggedIn.status])

    return (
        <div className='relative container mx-auto'>

            {/* custom message handlers  */}
            {watchlistApiRes.type === 'success' && <div className='z-10 fixed bottom-10 right-10 w-fit font-medium bg-primary-base text-white py-2 px-4 rounded-md'>{watchlistApiRes.msg}</div>}
            {watchlistApiRes.type === 'error' && <div className='z-10 fixed bottom-10 right-10 w-fit font-medium bg-optional text-white p-2 rounded-md'>{watchlistApiRes.msg}</div>}

            <div className="flex items-center justify-between">
                {/* crypto headline banner section  */}
                <CryptoBanner banner_headline='Cryptocurrency price list' banner_description='All cryptocurrencies ranked by market cap.' />

                {/* crypto searchbar section  */}
                <div className="flex items-center relative">
                    <input type="text" name="" id="" className='border border-gray-300 shadow-sm py-2 pl-3 pr-9 rounded-md w-96 outline-primary-base' placeholder='Search crypto coin....' value={searchText} onChange={(e) => handleSearch(e.target.value)} />
                    {
                        searchText.length > 0 ? <IoClose className='absolute right-3 text-gray-500 cursor-pointer' onClick={() => setSearchText('')} /> : <BiSearch className='absolute right-3 text-gray-500' />

                    }

                </div>

            </div>

            {/* table section starts  */}
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-20">
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
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6">
                                    {watchlistLoading && currentItemID === item.id ? <AiOutlineLoading3Quarters className='animate-spin text-gray-500' /> : <BsFillHeartFill className={`cursor-pointer text-gray-300 ${item.recordInWatchlist && 'text-optional'}`} title='Add to Favourites' onClick={() => addToWatchlist(item.id)} />}
                                </td>
                                <td className='py-4 px-6'>{item.rank}</td>
                                <td className='py-4 px-6 flex space-x-8'>
                                    <img src={item.image} alt="" className='w-10 object-contain' />
                                    <div className='text-xl font-medium'>
                                        <span className='text-gray-800'>{item.name}</span> <br /><span className='text-sm uppercase'>{item.code}</span>
                                    </div>
                                </td>
                                <td className='py-4 px-6'>{item.price}</td>
                                <td className='py-4 px-6'>{item.market_cap}</td>
                                <td className={`py-4 px-6 ${item.changeIn24.split('')[0] === '+' ? 'text-primary-base' : 'text-optional'}`}>{item.changeIn24}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>

                {loading === 'true' && <p className='flex flex-col items-center justify-center text-xl my-8'>Loading....</p>}


                {cryptoList?.length === 0 && loading === 'false' ? <div className="flex flex-col items-center justify-center text-xl my-8"><img src="https://www.fluoridefreepeel.ca/wp-content/uploads/2021/11/no-records.png" alt="" className='w-96' /> </div> : ''}

            </div>
        </div>
    )
}

export default CoinListTable