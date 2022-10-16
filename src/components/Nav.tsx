import React, { useContext, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Notification from './Notification';

function Nav() {
    const [userLoggedIn, setUserLoggedIn] = useContext(AuthContext)

    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('crypto')
        setUserLoggedIn({
            status: false,
            user: ""
        })
    }

    return (
        <div className="">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between">
                    {/* left flex section  */}
                    <Link to='/'><h1 className="text-primary-base font-medium text-xl">Crypto Notifier</h1></Link>

                    {/* right flex section starts  */}
                    <div className="flex items-center space-x-3">
                        {/* notification button starts  */}
                        {userLoggedIn?.status === true &&
                            <Notification />
                        }

                        {/* watch list section  */}
                        {userLoggedIn?.status === true &&
                            <Link to={'/watchlist'} >
                                <div className="border py-2 px-3 border-primary-base rounded-md flex items-center space-x-2 cursor-pointer">
                                    <BsFillHeartFill className='text-optional text-sm' />
                                    <p className='text-primary-base font-medium'>Watch List</p>
                                </div>
                            </Link>
                        }

                        {/* login signup section  */}
                        {
                            userLoggedIn?.status === true ? <div className="bg-gray-50 py-2 px-3 rounded-md">
                                <p>
                                    <span className='uppercase font-bold'>{userLoggedIn.user.split(' ')[0].split('')[0] + userLoggedIn.user.split(' ')[1].split('')[0]}</span> | <span className='hover:text-primary-base cursor-pointer' onClick={() => handleLogout()}>Logout</span>
                                </p>
                            </div>
                                :
                                <div className="flex items-center">
                                    <Link to={'/login'}>
                                        <p className={location.pathname === '/login' ? 'transition underline text-primary-base' : 'transition hover:underline hover:text-primary-base'}>Login</p>
                                    </Link>
                                    <span className='mx-1'> / </span>
                                    <Link to='/signup'>
                                        <p className={location.pathname === '/signup' ? 'transition underline text-primary-base' : 'transition hover:underline hover:text-primary-base'}>Signup</p>
                                    </Link>
                                </div>
                        }
                    </div>
                    {/* right flex section ends */}
                </div>
            </div>
            <hr />
        </div >
    )
}

export default Nav