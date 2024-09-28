import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import sliderCSS from './Slider.module.css'
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function TeaterSlider() {
    const [apiLink, setApiLink] = useState('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')
    const [movies, setMovies] = useState(null)
    const [activeItem, setActiveItem] = useState('#popular')

    // handle active class
    const handleItemClick = (item, apiLink) => {
        setActiveItem(item);
        setApiLink(apiLink);
    };

    async function getmovie() {
        try {

            let { data } = await axios.get(apiLink, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                    accept: "application/json"
                }
            })
            setMovies(data?.results)

        } catch (error) {
            console.log("error", error);
        }
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
        slidesToScroll: 4,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        speed: 9000,
        autoplaySpeed: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    };




    useEffect(() => {
        getmovie()
        for (let index = 0; index < document.querySelectorAll('#rate').length; index++) {
            if (document.querySelectorAll('#rate')[index].innerHTML > 8) {
                document.querySelectorAll('#rateArea')[index].classList.add(sliderCSS.green_light)

            } else if (document.querySelectorAll('#rate')[index].innerHTML >= 6 || document.querySelectorAll('#rate')[index].innerHTML < 8) {
                document.querySelectorAll('#rateArea')[index].classList.add(sliderCSS.yellow)


            } else if (document.querySelectorAll('#rate')[index].innerHTML >= 3 || document.querySelectorAll('#rate')[index].innerHTML < 6) {
                document.querySelectorAll('#rateArea')[index].classList.add(sliderCSS.orange)


            } else if (document.querySelectorAll('#rate')[index].innerHTML >= 1 || document.querySelectorAll('#rate')[index].innerHTML < 3) {
                document.querySelectorAll('#rateArea')[index].classList.add(sliderCSS.gray)

            } else {
                document.querySelectorAll('#rateArea')[index].classList.add(sliderCSS.red)
            }

        }
    }, [movies])

    return <>
        <div className="special_title">
            <h2>in teater</h2>
        </div>

        <ul className={'list-unstyled p-0 d-flex ' + sliderCSS.teater_list}>
            <li className={activeItem === '#popular' ? sliderCSS.active : ''} onClick={() => { handleItemClick('#popular', 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1') }}>#popular</li>
            <li className={activeItem === '#coming soon' ? sliderCSS.active : ''} onClick={() => { handleItemClick('#coming soon', 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1') }}>#coming soon</li>
            <li className={activeItem === '#top rated' ? sliderCSS.active : ''} onClick={() => { handleItemClick('#top rated', 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1') }}>#top rated</li>
            <li className={activeItem === '#most reviewed' ? sliderCSS.active : ''} onClick={() => { handleItemClick('#most reviewed', 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1') }}>#most reviewed</li>
        </ul>
        <div className="">
            <Slider {...settings} className="row justify-content-center">

                {movies?.map((movie, index) => {
                    return <div key={index} class="col-md-3 px-1 " >
                        <div className={"position-relative overflow-hidden " + sliderCSS.slide}>

                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                            <div id="rateArea" className={sliderCSS.overLay}>
                                <p className="m-0">
                                    <i class="fa-solid fa-star"></i>
                                    <span id="rate"> {movie.vote_average.toString().length > 1 ? movie.vote_average.toString().slice(0, 3) : movie.vote_average + .0}</span>
                                </p>
                            </div>

                            <div className={sliderCSS.overLayBtn}>
                                <div className={sliderCSS.btn}>
                                    <Link to={`/moviesDetails/${movie.id}`}>read more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>
        </div>




    </>
}