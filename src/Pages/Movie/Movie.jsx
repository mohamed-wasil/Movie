import movieCSS from './Movie.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';



export default function Movie() {
  const [nameOfSort, setNameOfSort] = useState(localStorage.getItem('movieSortOfName') ? localStorage.getItem('movieSortOfName') : "Popular")
  const [activeSortItem, setActiveSortItem] = useState(localStorage.getItem("activeSort") ? localStorage.getItem("activeSort") : "popular");

  function handleActiveSortItem(item) {
    setActiveSortItem(item)
    localStorage.setItem("activeSort", item)
  }

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
            <p className={'m-0 me-3 h4 text-capitalize ' + movieCSS.sort}>Sort By :</p>
            <div class="dropdown">
              <button class={" dropdown-toggle " + movieCSS.drobDown} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {nameOfSort}
              </button>

              <ul class="dropdown-menu">
              <li className={activeSortItem == "popular"? movieCSS.active :""} onClick={() => {
                  setNameOfSort("Popular");
                  localStorage.setItem('movieSortOfName', "Popular")
                  handleActiveSortItem("popular")
                }}><Link to='popular' class="dropdown-item" >Popular</Link></li>

                <li className={activeSortItem == "top rated"? movieCSS.active :""} onClick={() => {
                  setNameOfSort("Top Rated");
                  localStorage.setItem('movieSortOfName', "Top Rated")
                  handleActiveSortItem("top rated")
                }}><Link to='toprated' class="dropdown-item" >Top Rated</Link></li>

               
                <li className={activeSortItem == "now playing"? movieCSS.active :""} onClick={() => {
                  setNameOfSort("Now Playing");
                  localStorage.setItem('movieSortOfName', "Now Playing")
                  handleActiveSortItem("now playing")
                }}><Link to='nowplaying' class="dropdown-item" >Now Playing</Link></li>

                <li className={activeSortItem == "up comming"? movieCSS.active :""} onClick={() => {
                  setNameOfSort("Up Coming");
                  localStorage.setItem('movieSortOfName', "Up Coming")
                  handleActiveSortItem("up comming")
                }}><Link to='upcoming' class="dropdown-item" >UP Comming</Link></li>
              </ul>
            </div>
          </div>

        </div>
        <div className="row gy-lg-3 gy-2">
          <Outlet />
        </div>

      </div>
    </section>
  </>
}
