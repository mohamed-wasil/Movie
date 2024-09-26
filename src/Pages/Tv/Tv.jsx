import movieCSS from './Movie.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';



export default function Tv() {
  const [nameOfSort, setNameOfSort] = useState(localStorage.getItem('tvNameOfSort') ? localStorage.getItem('tvNameOfSort') : " Top Rated")


  async function getRelatedMovies() {
    return await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const relatedMovies = useQuery("getRelatedMovies", getRelatedMovies);



  if (relatedMovies.isLoading) {
    return <LoadingScreen />
  }

  return <>
    <section className={movieCSS.banner}>
      <div className={movieCSS.hero}>
        <div className="container">
          <div className="text-center  ">
            <h1>Tv Shows</h1>
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
              <button class={" dropdown-toggle " + movieCSS.drobDown} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {nameOfSort}
              </button>

              <ul class="dropdown-menu">
              <li onClick={() => {
                  setNameOfSort("Top Rated");
                  localStorage.setItem('tvNameOfSort', "Top Rated")
                }}><Link to='toprated' class="dropdown-item" >Top Rated</Link></li>
   
                <li onClick={() => {
                  setNameOfSort("Popular");
                  localStorage.setItem('tvNameOfSort', "Popular")
                }}><Link to='popular' class="dropdown-item" >Popular</Link></li>

                <li onClick={() => {
                  setNameOfSort("Airing Today");
                  localStorage.setItem('tvNameOfSort', "Airing Today")
                }}><Link to='airingToday' class="dropdown-item" >Airing Today</Link></li>

                <li onClick={() => {
                  setNameOfSort("On Air");
                  localStorage.setItem('tvNameOfSort', "On Air")
                }}><Link to='onAir' class="dropdown-item" >On Air</Link></li>
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
