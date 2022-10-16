import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoNotifications } from 'react-icons/io5'

type notificationType = {
    id: string,
    message: string
}[]
function Notification() {

    const [showNotifications, setShowNotifications] = useState(false)
    const [notificationData, setNotificationData] = useState<notificationType>([])

    const fetchRecords = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API}/notification/watchlist/all`).then(res => {
                setNotificationData(res.data.notifications)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRecords()
    }, [])
    return (
        <div className="relative ">
            <button className='py-3 px-3 bg-primary-base text-white rounded-md cursor-pointer' onClick={() => setShowNotifications(!showNotifications)}>
                <IoNotifications className='font-bold text-xl' />
            </button>
            {notificationData.length > 0 && <div className="absolute -top-2 -right-2 h-6 w-6 bg-optional text-white rounded-full flex flex-col justify-center items-center font-bold p-2">
                <p className='text-sm'>{notificationData.length}</p>
            </div>}
            {/* notification dropdown section  */}
            {notificationData?.map((item, i) => (
                <div className={`absolute rounded  w-[26vw] right-0 text-black z-10 top-12 transition-all duration-300 text-sm ${showNotifications ? 'h-full py-2 duration-500' : 'h-0 overflow-hidden  '}`}>
                    <p className='bg-gray-200 font-medium p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>{item.message}</p>
                </div>
            ))}
            {notificationData.length === 0 &&
                <div className={`absolute rounded  w-[26vw] right-0 text-black z-10 top-12 transition-all duration-300 text-sm ${showNotifications ? 'h-full py-2 duration-500' : 'h-0 overflow-hidden  '}`}>
                    <p className='bg-gray-200 font-medium p-4 border-b border-b-gray-200 cursor-pointer hover:bg-green-50 transition'>No Data Found!</p>
                </div>
            }

        </div>
    )
}

export default Notification