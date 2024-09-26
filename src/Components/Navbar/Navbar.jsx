import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../Images/logo1.png'
import navbarCSS from './Navbar.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { searchContext } from '../../Context/SearchContext'
export default function Navbar() {


  const { pathname } = useLocation()
  const { searchResults, setSearchResults, searchType, setSearchType, setSearchWords } = useContext(searchContext)
  const navigate = useNavigate()

  async function search(data) {
    try {
      let res = await axios.get(`https://api.themoviedb.org/3/search/${searchType}?include_adult=false&language=en-US&page=1`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNzI1OTkzOC41OTg4MDcsInN1YiI6IjY1NzM4NDM4MjgxMWExMDEzOGE2MzU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sd1Kd3iTrwN55KW1oxy75kXuQWHKbfcWJFplcZ2Phc4',
          accept: "application/json"
        },
        params: {
          query: data,
        }
      })
      await setSearchResults(res.data.results);
      navigate('/search')

    } catch (error) {
      console.log(error);

    }
  }

  function handleSubmit(value) {
    setSearchWords(value.searchName);
    search(value.searchName)

  }
  const myFormik = useFormik({
    initialValues: {
      searchName: '',
    },
    onSubmit: (value) => {
      handleSubmit(value)
    },
  })

useEffect(()=>{} , [searchType])
  return <>
    <div className={navbarCSS.nav_section}>
      <nav class={"navbar navbar-expand-lg  " + navbarCSS.nav}>
        <div class="container">
          <Link class="navbar-brand" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class={"navbar-nav me-auto mb-2 mb-lg-0 " + navbarCSS.list}>
              <li class={"nav-item " + " " + pathname == "/home" ? navbarCSS.active : ''} >
                <Link class={"nav-link " + navbarCSS.links} to="/home">Home</Link>
              </li>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links} to="/movie">Movies</Link>
              </li>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links} to="/tv">TV Shows</Link>
              </li>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links} to="/people">People</Link>
              </li>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links} to="/news">Community</Link>
              </li>
            </ul>

            <ul class={"navbar-nav ms-auto mb-2 mb-lg-0 " + navbarCSS.list}>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links} to="/login">Login</Link>
              </li>
              <li class="nav-item">
                <Link class={"nav-link " + navbarCSS.links + " " + navbarCSS.btn} to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">

        <form onSubmit={myFormik.handleSubmit} className={navbarCSS.top_search}>

          <div class={"dropdown " + navbarCSS.dropdown}>
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Search By {searchType}
            </button>
            <ul class="dropdown-menu text-center">
              <li><Link to='/search' onClick={() => {
                setSearchType('tv');
                localStorage.setItem('searchType', 'tv');
                myFormik.submitForm();

              }} className='h5'> Tv </Link></li>

              <li><Link to='/search' onClick={() => {
                setSearchType('movie');
                localStorage.setItem('searchType', 'movie');
                myFormik.submitForm();
              }} className='h5'> movie </Link></li>

              <li><Link to='/search' onClick={() => {
                setSearchType('person');
                localStorage.setItem('searchType', 'person');
                myFormik.submitForm();

              }} className='h5'> Person </Link></li>

            </ul>
          </div>
          <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.searchName} type="text" id='searchName' name='searchName' placeholder="Search fer a movie and TV Shows that you are looking for" required />

          <button  type='submit'><i class={"fa-solid fa-magnifying-glass"}></i></button>
        </form>
      </div>
    </div>
  </>
}
