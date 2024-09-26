import React from 'react'
import { Link, useParams } from 'react-router-dom'
import seasonCSS from './Seasons.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen'


export default function Seasons() {
    const { seriesID } = useParams()

    async function getMovieDetails() {
        return await axios.get(`https://api.themoviedb.org/3/tv/${seriesID}?language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const movieInfo = useQuery("getMovieDetails", getMovieDetails);
  // handle loading
  if (movieInfo.isLoading ) {
    return <LoadingScreen />
}

    return <>

        <section style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path}` }} className={seasonCSS.banner}>
            <div className={seasonCSS.banner_div}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <div className={seasonCSS.poster}>
                                <Link to={`/tvDetails/${movieInfo.data?.data.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.name} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className={seasonCSS.movie_content}>

                                <h3> <Link className={seasonCSS.link} to={`/tvDetails/${movieInfo.data?.data.id}`}>{movieInfo.data?.data.name}
                                {movieInfo.data?.data.seasons[movieInfo.data?.data.seasons.length - 1].air_date?.slice(0, 4) ?  <span>({movieInfo.data?.data.seasons[movieInfo.data?.data.seasons.length - 1].air_date?.slice(0, 4)})</span> : null}
                               
                                 </Link></h3>
                                <Link className={seasonCSS.link} to={`/tvDetails/${movieInfo.data?.data.id}`}>
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

        <section className={seasonCSS.last_season}>
            <div className="container">
                <div className="special_title">
                    <h2>all seasons of {movieInfo.data?.data.name}</h2>
                </div>

                {movieInfo.data?.data.seasons.map((season , idx) => {
                    return <div class={seasonCSS.season}>
                        <div class="row align-items-center">
                            <div className="col-md-1">
                                <div className="">
                                    <Link  to={`/season/${seriesID}/${season.season_number}`}> <img src={`https://image.tmdb.org/t/p/original/${season.poster_path}`} alt={season.name} /></Link>
                                </div>
                            </div>
                            <div className="col-md-11">
                                <h5 class={seasonCSS.season_title}>
                                    <Link  to={`/season/${seriesID}/${season.season_number}`}>
                                        {season.name}
                                        {season.air_date?.slice(0, 4) ?<span>({season.air_date?.slice(0, 4)})</span> :null}
                                        
                                        </Link>
                                </h5>
                                <div className={seasonCSS.season_info}>
                                    {season.vote_average ==0 ? null : <span><i class="fa-solid fa-star me-1"></i> {season.vote_average}</span>}
                                   
                                    <span>{season.episode_count} Episodes</span>
                                </div>
                                <p class="card-text"> season {season.season_number} of Breaking Bad premiered on {season.air_date}</p>
                                <p class="card-text">{season.overview}</p>

                            </div>
                        </div>
                    </div>
                })}

            </div>
        </section>
    </>
}
