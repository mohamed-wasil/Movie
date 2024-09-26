import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import castCSS from './CastInfo.module.css'
import Slider from 'react-slick';
import maleImage from '../../Images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
import femaleImage from '../../Images/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';


export default function CastInfo() {
    const { castID } = useParams();

    async function getCastInfo() {
        return await axios.get(`https://api.themoviedb.org/3/person/${castID}language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const castInfo = useQuery("getCastInfo", getCastInfo);


    async function getCastMovie() {
        return await axios.get(`https://api.themoviedb.org/3/person/${castID}/combined_credits?language=en-US`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const castMovies = useQuery("getCastMovie", getCastMovie);

    // handle loading
    if (castMovies.isLoading || castInfo.isLoading) {
        return <LoadingScreen />
    }
    

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none" }}
                onClick={onClick}
            />
        );
    }

    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        // autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        speed: 9000,
        autoplaySpeed: 0,
        cssEase: "linear"
    };

    return <>

        <section className={castCSS.cast}>
            <div className="position-relative z-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className={castCSS.cast_image}>
                                {/* <img src={`https://image.tmdb.org/t/p/original/${castInfo.data?.data.profile_path}`} alt={castInfo.data?.data.name} /> */}
                                {castInfo.data?.data.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${castInfo.data?.data.profile_path}`} alt={castInfo.data?.data.name} />
                                    : <>
                                        {castInfo.data?.data.gender == 1 ? <img src={femaleImage} alt={castInfo.data?.data.name} /> :
                                            <img src={maleImage} alt={castInfo.data?.data.name} />}
                                    </>}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className={castCSS.cast_info}>
                                <h2>{castInfo.data?.data.name}</h2>
                                <h3>Biography</h3>
                                <p>{castInfo.data?.data.biography.split(".").map((text, idx) => { return <span key={idx}>{text}</span> })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*  */}

        <section className={castCSS.personal}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className='mb-5 text-decoration-underline '>Personal Information</h4>
                        <p className={castCSS.text}>

                            <strong className='d-block'>Known For</strong>
                            <span>{castInfo.data?.data.known_for_department}</span>
                        </p>

                        <p className={castCSS.text}>
                            <strong className='d-block'>Gender</strong>
                            <span>{castInfo.data?.data.gender == 1 ? "Female" : "Male "}</span>
                        </p>

                        <p className={castCSS.text}>
                            <strong className='d-block'>Birthday</strong>
                            <span> {castInfo.data?.data.birthday}</span>
                        </p>
                        {castInfo.data?.data.deathday ? <p className={castCSS.text}>
                            <strong className='d-block'>deathday</strong>
                            <span>   {castInfo.data?.data.deathday}</span>
                        </p> : ""}
                        <p className={castCSS.text}>
                            <strong className='d-block'>Place of Birth </strong>

                            <span> {castInfo.data?.data.place_of_birth}</span>
                        </p>

                        {castInfo.data?.data.also_known_as.length == 0 ? "" : <p className={castCSS.text}>
                            <strong className='d-block'>Also Known As</strong>
                            <ul className='list-unstyled'>
                                {castInfo.data?.data.also_known_as.map((per, idx) => { return <li key={idx}>{per}</li> })}
                            </ul>
                        </p>}
                    </div>

                    <div className="col-md-9">
                        <h4 className='mb-5 '>Known For</h4>
                        <div className={castCSS.cast_movies}>
                            <div className="">
                                <Slider {...settings} className="row justify-content-center">

                                    {castMovies.data?.data.cast?.map((movie, index) => {
                                        return <div key={index} class="col-md-3 px-3 " >
                                            <div className={"position-relative overflow-hidden " + castCSS.slide}>
                                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                                                <div className={castCSS.overLayBtn}>
                                                    <div className={castCSS.btn}>
                                                        {movie.seasons ? <Link to={`/tvDetails/${movie.id}`}>read more</Link> : <Link to={`/moviesDetails/${movie.id}`}>read more</Link>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={castCSS.char}>
                                                <h5>{movie.seasons == null ? <Link to={`/moviesDetails/${movie.id}`}>{movie.title}</Link> : <Link to={`/tvDetails/${movie.id}`}>{movie.title}</Link>}
                                                </h5>
                                                <p>as {movie.character}</p>
                                            </div>
                                        </div>
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}
