import React from 'react'
import movieCSS from '../MoreMovies.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../../../../Components/LoadingScreen/LoadingScreen';
export default function Similar() {
  const { movieID } = useParams()

  async function getMovieDetails() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movieInfo = useQuery("getMovieDetails", getMovieDetails);

  async function getMovie() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movies = useQuery("getMovie", getMovie);
  // handle Loading 
  if (movies.isLoading || movieInfo.isLoading) {
    return <LoadingScreen />
  }


  return <>
    <section style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path}` }} className={movieCSS.banner}>
      <div className={movieCSS.banner_div}>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <div className={movieCSS.poster}>
                <Link to={`/moviesDetails/${movieInfo.data?.data.id}`}>
                  <img src={`https://image.tmdb.org/t/p/original/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.original_title} />
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className={movieCSS.movie_content}>

                <h3> <Link className={movieCSS.link} to={`/moviesDetails/${movieInfo.data?.data.id}`}>{movieInfo.data?.data.original_title} <span>({movieInfo.data?.data.release_date.slice(0, 4)})</span> </Link></h3>
                <Link className={movieCSS.link} to={`/moviesDetails/${movieInfo.data?.data.id}`}>
                  <i class="fa-solid fa-arrow-left"></i>
                  Back to main
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*  */}
    <section className={movieCSS.movie}>
      <div className="container">
        <div className="special_title d-flex justify-content-between">
          <h2>Similar  Movies </h2>
        </div>
        <div className="row gy-3">
          {movies.data?.data.results?.map((movie, index) => {
            return <div key={index} class="col-md-2 px-3 " >
              <div className={"position-relative overflow-hidden " + movieCSS.slide}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                <div className={movieCSS.overLayBtn}>
                  <div className={movieCSS.btn}>
                    <Link to={`/moviesDetails/${movie.id}`}>read more</Link>
                  </div>
                </div>

              </div>
              <div className={movieCSS.char}>
                <h5><Link to={`/moviesDetails/${movie.id}`}>{movie.title}</Link></h5>
                <p><i class="fa-solid fa-star"></i>{movie.vote_average}<span>/ 10</span></p>
              </div>
            </div>
          })}
        </div>

      </div>
    </section>

  </>
}
