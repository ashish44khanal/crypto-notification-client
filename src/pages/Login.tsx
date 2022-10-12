import React from 'react'

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <div className="bg-gray-100 p-8 shadow-lg w-1/3">
                <h1 className="text-xl font-bold">
                    Login
                </h1>
                <hr className='border-gray-300 mt-3' />
                <form action="">
                    <div className="flex flex-col space-y-2 my-5">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="border p-3 rounded-md outline-primary-base" id='email' placeholder='Enter you email here ' />
                    </div>
                    <div className="flex flex-col space-y-2 my-5">
                        <label htmlFor="password">password</label>
                        <input type="password" className="border p-3 rounded-md outline-primary-base" id='password' placeholder='Enter you email here ' />
                    </div>

                    <div className="flex flex-col space-y-2 my-5">
                        <input type="submit" className="bg-primary-base text-white px-4 py-2 rounded-md w-fit font-bold cursor-pointer" value="LOGIN" />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login