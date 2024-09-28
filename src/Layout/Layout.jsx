import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Helmet } from 'react-helmet'

export default function Layout() {
  return <>

  <Helmet >
  <link rel="icon" href={require('../Images/logo.png')} />
  </Helmet>
  <Navbar />
  
  <Outlet />

  <Footer />
  
  </>
}
