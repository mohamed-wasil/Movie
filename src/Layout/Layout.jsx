import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Helmet } from 'react-helmet'
import layoutCss from './Layout.module.css'

export default function Layout() {
  window.onscroll = () => {
    if (window.scrollY > 150) {
      document.getElementById('header').classList.add('header-fix');
      document.getElementById('btnUp').classList.add('show-btn');
    }
    else {
      document.getElementById('header').classList.remove('header-fix');
      document.getElementById('btnUp').classList.remove('show-btn');
    }
  };


  function scroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  return <>

    <Helmet >
      <link rel="icon" href={require('../Images/logo.png')} />
    </Helmet>
    <Navbar />
    <Outlet />
    <button  id='btnUp' onClick={scroll} className={layoutCss.btnUp}><i class="fa-solid fa-chevron-up"></i></button>
    <Footer />

  </>
}
