import React from 'react'
import movieCSS from '../MoreMovies.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../../../../Components/LoadingScreen/LoadingScreen';
export default function TvSimilar() {
  const { movieID } = useParams()

  async function getMovieDetails() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${movieID}?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movieInfo = useQuery("getMovieDetails", getMovieDetails);

  async function getMovie() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${movieID}/similar?language=en-US&page=1`, {
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
                                <Link to={`/tvDetails/${movieInfo.data?.data.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.name} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className={movieCSS.movie_content}>

                                <h3> <Link className={movieCSS.link} to={`/tvDetails/${movieInfo.data?.data.id}`}>{movieInfo.data?.data.name}
                                    <span>({movieInfo.data?.data.first_air_date?.slice(0, 4)})</span>

                                    {/* {movieInfo.data?.data.seasons[movieInfo.data?.data.seasons.length - 1].air_date ?  <span>({movieInfo.data?.data.seasons[movieInfo.data?.data.seasons?.length - 1].air_date?.slice(0, 4)})</span> : ""} */}

                                </Link></h3>
                                <Link className={movieCSS.link} to={`/tvDetails/${movieInfo.data?.data.id}`}>
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
          <h2>Similar Tv Series </h2>
        </div>
        <div className="row gy-3">
          {movies.data?.data.results?.map((movie, index) => {
            return <div key={index} class="col-md-2 px-3 " >
              <div className={"position-relative overflow-hidden " + movieCSS.slide}>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                <div className={movieCSS.overLayBtn}>
                  <div className={movieCSS.btn}>
                    <Link to={`/tvDetails/${movie.id}`}>read more</Link>
                  </div>
                </div>

              </div>
              <div className={movieCSS.char}>
                <h5><Link to={`/tvDetails/${movie.id}`}>{movie.title}</Link></h5>
                <p><i class="fa-solid fa-star"></i>{movie.vote_average}<span>/ 10</span></p>
              </div>
            </div>
          })}
        </div>

      </div>
    </section>

  </>
}
