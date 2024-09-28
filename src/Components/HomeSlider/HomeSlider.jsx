import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import homeSlideCSS from './HomeSlide.module.css'
import { useQuery } from "react-query";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function HomeSlider() {

    async function getTopRatedMovies() {
        return await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const topRatedMovies = useQuery("getTopRatedMovies", getTopRatedMovies);

    // handle loading
    if (topRatedMovies.isLoading) {
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
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        speed: 9000,
        autoplaySpeed: 0,
        cssEase: "linear",
        responsive: [
           
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
    };

    // console.log( topRatedMovies.data?.data.results[5].vote_average.toString().length );



    return <>
        <div className="container">
            <Slider {...settings} className="row justify-content-center">

                {topRatedMovies.data?.data.results.map((movie, index) => {
                    return <div key={index} class="col-md-3 px-2 " >
                        <div className={"position-relative overflow-hidden " + homeSlideCSS.slide}>

                            <Link to={`/moviesDetails/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} /></Link>
                            <div className={homeSlideCSS.overLay}>
                                <p className="m-0">
                                    <i class="fa-solid fa-star"></i> 
                                    {movie.vote_average.toString().length > 1 ?   movie.vote_average.toString().slice(0, 3) : movie.vote_average }
                                </p>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>
        </div>

    </>
}