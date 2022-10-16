import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div className='bg-gray-100 flex flex-col items-center justify-center h-[90vh]'>
            <h1 className="text-6xl text-gray-700 font-bold my-2">404</h1>
            <p className="text-lg text-gray-600 my-2">
                Sorry, We couldn't find what you are looking for!
            </p>
            <button className="px-3 py-2 bg-gray-200 text-gray-600 my-4" onClick={() => handleBack()}>
                Go back
            </button>
        </div>
    )
}

export default NotFound