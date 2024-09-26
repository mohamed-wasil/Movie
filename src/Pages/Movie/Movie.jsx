import movieCSS from './Movie.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';



export default function Movie() {
  const [nameOfSort, setNameOfSort] = useState(localStorage.getItem('movieSortOfName') ? localStorage.getItem('movieSortOfName') : "Popular")


  async function getRelatedMovies() {
    return await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const relatedMovies = useQuery("getRelatedMovies", getRelatedMovies);
   // handle loading
   if (relatedMovies.isLoading) {
    return <LoadingScreen />
  }

  return <>
    <section className={movieCSS.banner}>
      <div className={movieCSS.hero}>
        <div className="container">
          <div className="text-center  ">
            <h1>movie listing</h1>
            <div className={movieCSS.banner_text}>
              <Link to='/' >Home</Link>
              <i class="fa-solid fa-chevron-right"></i>
              <span>{nameOfSort}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*  */}

    <section className={movieCSS.movie}>
      <div className="container">
        <div className="special_title d-flex justify-content-between">
          <h2>{nameOfSort} Movies </h2>
          <div className="d-flex align-items-center ">
            <p className='m-0 me-3 h4 text-capitalize'>Sort By :</p>
          <div class="dropdown">
            <button class={" dropdown-toggle "+ movieCSS.drobDown} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {nameOfSort}
            </button>
     
            <ul class="dropdown-menu">
            <li onClick={()=>{
                setNameOfSort("Top Rated");
                localStorage.setItem('movieSortOfName', "Top Rated")
                }}><Link  to='toprated' class="dropdown-item" >Top Rated</Link></li>

              <li onClick={()=>{
                setNameOfSort("Popular");
                localStorage.setItem('movieSortOfName', "Popular")
                }}><Link  to='popular' class="dropdown-item" >Popular</Link></li>
             
              <li onClick={()=>{
                setNameOfSort("Now Playing");
                localStorage.setItem('movieSortOfName', "Now Playing")
                }}><Link  to='nowplaying' class="dropdown-item" >Now Playing</Link></li>

              <li onClick={()=>{
                setNameOfSort("Up Coming");
                localStorage.setItem('movieSortOfName', "Up Coming")}}><Link  to='upcoming' class="dropdown-item" >UP Comming</Link></li>
            </ul>
          </div>
          </div>
          
        </div>
        <div className="row gy-3">
          <Outlet />     
        </div>

      </div>
    </section>
  </>
}
