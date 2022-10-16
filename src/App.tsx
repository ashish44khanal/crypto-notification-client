import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Watchlist from './pages/Watchlist';
import Nav from './components/Nav';
import jwt_decode from 'jwt-decode'
import { AuthContext, authType } from './context/AuthContext';



function App() {


  const [userLoggedIn, setUserLoggedIn] = useState<authType>({
    status: false,
    user: ''
  })


  // const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('crypto')
    setUserLoggedIn({
      status: false,
      user: ""
    })
    return redirect('/')
  }

  console.log(userLoggedIn)


  useEffect(() => {
    const token = localStorage.getItem('crypto')
    console.log("app rendered");

    if (token) {
      const decoded: { exp: number, full_name: string, iat: number, user_id: string } = jwt_decode(token)

      setUserLoggedIn({
        status: true,
        user: decoded.full_name as any
      })

      if (new Date(decoded.exp * 1000) < new Date()) {
        handleLogout()
      }

    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
          <Nav />
        </AuthContext.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
