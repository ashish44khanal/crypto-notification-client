import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const [userLoggedIn] = useContext(AuthContext)
    return (
        userLoggedIn.status === true ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes