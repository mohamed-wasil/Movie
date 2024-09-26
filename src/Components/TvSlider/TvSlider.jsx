import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import tvSliderCSS from './TvSlider.module.css'
import { Link } from "react-router-dom";

export default function TvSlider() {
    const [apiLink, setApiLink] = useState('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1')
    const [movie, setMovie] = useState(null)

    async function getmovie() {
        try {

            let { data } = await axios.get(apiLink, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                    accept: "application/json"
                }
            })
            setMovie(data?.results)

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
        slidesToScroll: 3,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        speed: 9000,
        autoplaySpeed: 0,
        cssEase: "linear",
        rtl: true
    };


    useEffect(() => {
        getmovie()
        for (let index = 0; index < document.querySelectorAll('#rate').length; index++) {
             if(document.querySelectorAll('#rate')[index].innerHTML > 8){
                document.querySelectorAll('#rateArea')[index].classList.add(tvSliderCSS.green_light)
                
             }else if(document.querySelectorAll('#rate')[index].innerHTML >= 6 || document.querySelectorAll('#rate')[index].innerHTML < 8){
                document.querySelectorAll('#rateArea')[index].classList.add(tvSliderCSS.yellow)
                

            }else if(document.querySelectorAll('#rate')[index].innerHTML>=3 || document.querySelectorAll('#rate')[index].innerHTML < 6){
                document.querySelectorAll('#rateArea')[index].classList.add(tvSliderCSS.orange)
                

            }else if(document.querySelectorAll('#rate')[index].innerHTML>=1 || document.querySelectorAll('#rate')[index].innerHTML < 3){
                document.querySelectorAll('#rateArea')[index].classList.add(tvSliderCSS.gray)
                
            }else{
                document.querySelectorAll('#rateArea')[index].classList.add(tvSliderCSS.red)    
            }
             
        }
    },  [movie])


    return <>
        <div className="special_title">
            <h2>on tv</h2>
        </div>

        <ul className={'list-unstyled p-0 d-flex ' + tvSliderCSS.teater_list}>
            <li id="list" className={tvSliderCSS.active} onClick={() => { setApiLink('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1') }}>#popular</li>
            <li id="list" onClick={() => { setApiLink('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1') }}>#on air</li>
            <li id="list" onClick={() => { setApiLink('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1') }}>#top rated</li>
            <li id="list" onClick={() => { setApiLink('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1') }}>#airing today</li>
        </ul>
        <div className="">
            <Slider {...settings} className="row justify-content-center">

                {movie?.map((movie, index) => {
                    return <div key={index} class="col-md-3 px-3 " >
                        <div className={"position-relative overflow-hidden " + tvSliderCSS.slide}>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.name} />
                          <div id="rateArea"  className={tvSliderCSS.overLay}>
                                <p className="m-0">
                                    <i class="fa-solid fa-star"></i>
                                    <span id="rate"> {movie.vote_average.toString().length > 1 ? movie.vote_average.toString().slice(0, 3) : movie.vote_average + .0}</span>
                                </p>
                            </div>

                            <div className={tvSliderCSS.overLayBtn}>
                                <div className={tvSliderCSS.btn}>
                                    <Link to={`/tvDetails/${movie.id}`}>read more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>
        </div>




    </>
}