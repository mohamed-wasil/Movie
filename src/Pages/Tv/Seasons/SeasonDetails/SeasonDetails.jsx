import React from 'react'
import seasonCSS from '../Seasons.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../../../../Components/LoadingScreen/LoadingScreen';


export default function SeasonDetails() {
    const { seriesID, seasonNumber } = useParams();

    async function getMovieDetails() {
        return await axios.get(`https://api.themoviedb.org/3/tv/${seriesID}?language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const movieInfo = useQuery("getMovieDetails", getMovieDetails);

    async function getSeasonDetails() {
        return await axios.get(`https://api.themoviedb.org/3/tv/${seriesID}/season/${seasonNumber}?language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const seasonInfo = useQuery("getSeasonDetails", getSeasonDetails);

    // handle loading
    if (movieInfo.isLoading || seasonInfo.isLoading) {
        return <LoadingScreen />
    }

    return <>

        <section style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path}` }} className={seasonCSS.banner}>
            <div className={seasonCSS.banner_div}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-md-2 col-sm-3">
                            <div className={seasonCSS.poster}>
                                <Link to={`/tvDetails/${movieInfo.data?.data.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${seasonInfo.data?.data.poster_path}`} alt={seasonInfo.data?.data.name} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-8 mt-sm-0 mt-3">
                            <div className={seasonCSS.movie_content}>

                                <h3> <Link className={seasonCSS.link} to={`/tvDetails/${movieInfo.data?.data.id}`}>{seasonInfo.data?.data.name}
                                    {seasonInfo.data?.data.air_date?.slice(0, 4) ? <span>({seasonInfo.data?.data.air_date?.slice(0, 4)})</span> : null}

                                </Link>
                                </h3>
                                <Link className={seasonCSS.link} to={`/seasons/${movieInfo.data?.data.id}`}>
                                    <i class="fa-solid fa-arrow-left"></i>
                                    Back Season List
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
                    <h2>episodes <span className='opacity-75'>({seasonInfo.data?.data.episodes.length})</span></h2>
                </div>

                {seasonInfo.data?.data.episodes.map((season, idx) => {
                    return <div key={idx} class={seasonCSS.season}>
                        <div class="row align-items-center">
                            <div className="col-lg-2 col-md-3">
                                <div className={seasonCSS.season_cover}>
                                    <Link to={``}> <img src={`https://image.tmdb.org/t/p/original/${season.still_path}`} alt={season.name} /></Link>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-9 mt-md-0 mt-3">
                                <h5 class={seasonCSS.season_title}>
                                    <Link to={``}>
                                        <p className='me-2 d-inline-block'>{season.episode_number} - </p>
                                        {season.name}
                                        {season.air_date?.slice(0, 4) ? <span>({season.air_date?.slice(0, 4)})</span> : null}

                                    </Link>
                                </h5>
                                <div className={seasonCSS.season_info}>
                                    <span><i class="fa-solid fa-star me-1"></i> {season.vote_average}</span>
                                    <span className='text-decoration-underline'>{season.runtime} min</span>
                                </div>
                                <p class={"card-text "+seasonCSS.season_overview}>{season.overview}</p>
                            </div>
                        </div>

                    </div>
                })}


            </div>
        </section>
    </>
}
