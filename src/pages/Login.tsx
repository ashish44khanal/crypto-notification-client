import axios from 'axios';
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
type Inputs = {
    email: string,
    password: string
};
type FieldValidationErros = {
    location: string,
    msg: string,
    param: string,
    value: string
}[]
const Login = () => {
    const [userLoggedIn, setUserLoggedIn] = useContext(AuthContext)

    const [loading, setLoading] = useState(false);
    const [apiRes, setApiRes] = useState({
        type: '',
        msg: ''
    })

    const [validationsErr, setValidationsErr] = useState<FieldValidationErros>([])
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_API}/user/login`, {
                email: data.email,
                password: data.password
            }).then(res => {
                setLoading(false)
                setValidationsErr([])
                localStorage.setItem('crypto', res.data.access_token)
                //TODO: create dynamic base url using .env
                setTimeout(() => {
                    window.location.replace('http://localhost:3000')
                }, 800);
                setApiRes({
                    type: 'success',
                    msg: res.data.msg
                })
            })
        } catch (error: any) {
            setLoading(false)
            console.log(error.response.data)
            if (error.response.data.errors) {
                setApiRes({
                    type: '',
                    msg: ''
                })
                setValidationsErr(error.response.data.errors)
                console.log(error.response.data.errors)
            }
            if (error.response.data.err) {
                setValidationsErr([])
                setApiRes({
                    type: 'error',
                    msg: error.response.data.message
                })
                console.log(error.response.data.message)
            }
        }
    };


    return (
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <div className="bg-gray-100 p-8 shadow-lg w-1/3">
                <h1 className="text-xl font-bold">
                    Login
                </h1>
                <hr className='border-gray-300 mt-3' />
                {apiRes.type === 'success' && <p className='bg-primary-base text-white p-2 rounded-md'>{apiRes.msg}</p>}
                {apiRes.type === 'error' && <p className='bg-optional text-white p-2 rounded-md'>{apiRes.msg}</p>}
                {validationsErr && validationsErr.map((item, i) => (
                    <p key={i} className="bg-optional p-2 text-white mb-4 rounded-md">
                        {item.param + ' ' + item.msg}
                    </p>
                ))}
                <form action="" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-col space-y-2 my-5">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                            className="border p-3 rounded-md outline-primary-base"
                            id='email'
                            placeholder='Enter you email here '
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className='text-red-500'>This field is required</span>}

                    </div>
                    <div className="flex flex-col space-y-2 my-5">
                        <label htmlFor="password">password</label>
                        <input type="password"
                            className="border p-3 rounded-md outline-primary-base"
                            id='password'
                            placeholder='Enter you email here '
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className='text-red-500'>This field is required</span>}
                    </div>

                    <div className="flex flex-col space-y-2 my-5">
                        <input type="submit" className="bg-primary-base text-white px-4 py-2 rounded-md w-fit font-bold cursor-pointer" value={loading ? 'LOADING...' : "Login"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
