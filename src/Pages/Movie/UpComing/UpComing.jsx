import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import movieCSS from '../Movie.module.css'
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';

export default function UpComing() {
  async function getMovie() {
    return await axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movies = useQuery("getMovie", getMovie);

  // handle loading
  if (movies.isLoading) {
    return <LoadingScreen />
  }

  return <>

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
  </>
}
