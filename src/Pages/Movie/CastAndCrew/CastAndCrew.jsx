import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import maleImage from '../../../Images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
import femaleImage from '../../../Images/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'

import castCSS from './Cast.module.css'
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen'

export default function CastAndCrew() {

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


    async function getAllCasts() {
        return await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const allCasts = useQuery("getAllCasts", getAllCasts)

    // handle loading
    if (movieInfo.isLoading || allCasts.isLoading) {
        return <LoadingScreen />
    }
    return <>

        <section style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path}` }} className={castCSS.banner}>
            <div className={castCSS.banner_div}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <div className={castCSS.poster}>
                                <Link to={`/moviesDetails/${movieInfo.data?.data.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.original_title} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className={castCSS.movie_content}>

                                <h3> <Link className={castCSS.link} to={`/moviesDetails/${movieInfo.data?.data.id}`}>{movieInfo.data?.data.original_title} <span>({movieInfo.data?.data.release_date.slice(0, 4)})</span> </Link></h3>
                                <Link className={castCSS.link} to={`/moviesDetails/${movieInfo.data?.data.id}`}>
                                    <i class="fa-solid fa-arrow-left"></i>
                                    Back to main
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>

        <section className={castCSS.column}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Series Cast <span className='ms-1 opacity-75'>{allCasts.data?.data.cast.length}</span></h3>
                        <ul className={castCSS.person}>
                            {allCasts.data?.data.cast.map((person, idx) => {
                                return <li key={idx}>
                                    <div className={castCSS.person_image}>
                                        <Link to={`/cast/${person.id}`}>
                                            {person.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt={person.name} />
                                                : <>
                                                    {person.gender == 1 ? <img src={femaleImage} alt={person.name} /> :
                                                        <img src={maleImage} alt={person.name} />}
                                                </>}
                                        </Link>
                                    </div>
                                    <div className={castCSS.person_info}>
                                        <p> <Link to={`/cast/${person.id}`}>{person.name} <span className='opacity-75 ms-2'>({person.known_for_department})</span></Link></p>
                                        <span>as {person.character}</span>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h3>Series Crew <span className='ms-1 opacity-75'>{allCasts.data?.data.crew.length}</span></h3>
                        <ul className={castCSS.person}>
                            {allCasts.data?.data.crew.map((person, idx) => {
                                return <li key={idx}>
                                    <div className={castCSS.person_image}>
                                        <Link to={`/cast/${person.id}`}>
                                            {person.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt={person.name} />
                                                : <>
                                                    {person.gender == 1 ? <img src={femaleImage} alt={person.name} /> :
                                                        <img src={maleImage} alt={person.name} />}
                                                </>}
                                        </Link>
                                    </div>
                                    <div className={castCSS.person_info}>
                                        <p> <Link to={`/cast/${person.id}`}>{person.name} <span className='opacity-75 ms-2'>({person.known_for_department})</span></Link></p>
                                        <span> {person.job}</span>
                                    </div>
                                </li>
                            })}
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    </>
}
