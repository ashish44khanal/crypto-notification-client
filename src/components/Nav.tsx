import React, { useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { IoClose, IoNotifications } from 'react-icons/io5'
import { Link } from 'react-router-dom';

function Nav() {
    const [searchText, setSearchText] = useState('');
    const [showNotifications, setShowNotifications] = useState(false)
    return (
        <div className="">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between">
                    {/* left flex section  */}
                    <Link to='/'><h1 className="text-primary-base font-medium text-xl">Crypto Notifier</h1></Link>

                    {/* right flex section starts  */}
                    <div className="flex items-center space-x-3">
                        {/* search bar start  */}
                        <div className="flex items-center relative">
                            <input type="text" name="" id="" className='border py-2 pl-3 pr-9 rounded-md w-80 outline-primary-base' placeholder='Search crypto coin....' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                            {
                                searchText.length > 0 ? <IoClose className='absolute right-3 text-gray-500 cursor-pointer' onClick={() => setSearchText('')} /> : <BiSearch className='absolute right-3 text-gray-500' />

                            }

                        </div>
                        {/* notification button starts  */}
                        <div className="relative ">
                            <button className='py-3 px-3 bg-primary-base text-white rounded-md cursor-pointer' onClick={() => setShowNotifications(!showNotifications)}>
                                <IoNotifications className='font-bold text-xl' />
                            </button>
                            <div className="absolute -top-2 -right-2 h-6 w-6 bg-optional text-white rounded-full flex flex-col justify-center items-center font-bold p-2">
                                <p className='text-sm'>21</p>
                            </div>
                            {/* notification dropdown section  */}
                            <div className={`absolute rounded  w-[26vw] right-0 text-black z-10 top-12 transition-all duration-300 text-sm ${showNotifications ? 'h-full py-2 duration-500' : 'h-0 overflow-hidden  '}`}>
                                <p className='bg-gray-200 font-medium p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>BTC is on the move, The Price is down -3.5% in 24 hrs to $34900 4.</p>
                                <p className='bg-gray-50 p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>BTC is on the move, The Price is down -3.5% in 24 hrs to $34900 4.</p>
                                <p className='bg-gray-50 p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>BTC is on the move, The Price is down -3.5% in 24 hrs to $34900 4.</p>
                                <p className='bg-gray-200 font-medium p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>BTC is on the move, The Price is down -3.5% in 24 hrs to $34900 4.</p>
                                <p className='bg-gray-50 p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>BTC is on the move, The Price is down -3.5% in 24 hrs to $34900 4.</p>

                            </div>
                        </div>

                        {/* watch list section  */}
                        <Link to={'/watchlist'} >
                            <div className="border py-2 px-3 border-primary-base rounded-md flex items-center space-x-2 cursor-pointer">
                                <BsFillHeartFill className='text-optional text-sm' />
                                <p className='text-primary-base font-medium'>Watch List</p>
                            </div>
                        </Link>
                        {/* login signup section  */}
                        <div className="flex items-center">
                            <Link to={'/login'}>
                                <p className='transition hover:underline hover:text-primary-base'>Login</p>
                            </Link>
                            <span className='mx-1'> / </span>
                            <Link to='/signup'>
                                <p className='transition hover:underline hover:text-primary-base'>Signup</p>
                            </Link>
                        </div>
                    </div>
                    {/* right flex section ends */}
                </div>
            </div>
            <hr />
        </div >
    )
}

export default Nav