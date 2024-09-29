import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import movieDetailsCSS from './MovieDetails.module.css'
import Slider from 'react-slick'
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen'
import maleImage from '../../../Images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
import femaleImage from '../../../Images/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'
import { Helmet } from 'react-helmet'

export default function MoviesDetails() {
  const { id } = useParams()

  async function getMovieDetails() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movieInfo = useQuery("getMovieDetails", getMovieDetails, {
    refetchInterval: 500, // refetch every half second
  });

  async function getCasts() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const castInfo = useQuery("getCasts", getCasts)

  async function getRelatedMovies() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const relatedMovies = useQuery("getRelatedMovies", getRelatedMovies);

  async function getRecomedationMovies() {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const recomendatinMovies = useQuery("getRecomedationMovies", getRecomedationMovies)

  // handle loading
  if (movieInfo.isLoading || castInfo.isLoading || relatedMovies.isLoading || recomendatinMovies.isLoading) {
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
    slidesToScroll: 6,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 10000,
    autoplaySpeed: 0,
    cssEase: "linear",
    lazyLoad: true,
    responsive: [

      {
        breakpoint: 830,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      }
    ]
  };

  return <>
    <Helmet >
      <title>BlockBoster Movie-Details</title>
    </Helmet>

    <section className={movieDetailsCSS.main_sec} style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path})` }}>
      <div className={movieDetailsCSS.main_div}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-sm-12 ">
              <div className={movieDetailsCSS.image}>
                <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.original_title} />
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-12 ">
              <div className={movieDetailsCSS.content}>
                <h1>{movieInfo.data?.data.original_title} <span className='opacity-75'>({movieInfo.data?.data.release_date?.slice(0, 4)})</span></h1>
                <div className={movieDetailsCSS.genres_box}>
                  {movieInfo.data?.data.genres.map((gen, ind) => { return <span key={ind} className={movieDetailsCSS.genres}>{gen.name}</span> })}
                </div>
                <p><span>over View : <br /></span>{movieInfo.data?.data.overview}</p>
                <ul>
                  {/* <li><strong>Release Date:</strong> {new Date(movieInfo.data?.data.release_date).toLocaleDateString()}</li> */}
                  <li><strong>Vote Average:</strong> {movieInfo.data?.data.vote_average}</li>
                  <li><strong>Popularity:</strong> {movieInfo.data?.data.popularity}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    {/*  */}

    <section className={movieDetailsCSS.casts}>
      <div className="container">
        <div className="special_title">
          <h2>Series Cast </h2>
        </div>
        <div className="row  gy-4">
          {castInfo.data?.data?.cast.slice(0, 6).map((person, index) => {
            return <div key={index} class="col-lg-2 col-md-3 col-sm-4 col-6 px-1 " >
              <div className={"position-relative overflow-hidden " + movieDetailsCSS.slide}>
                <Link to={`/cast/${person.id}`}>
                  {person.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${person.profile_path} `} alt={person.name} /> : <>
                    {person.profile_path.gender == 1 ? <img src={femaleImage} alt={person.name} /> :
                      <img src={maleImage} alt={person.name} />}
                  </>}
                </Link>
              </div>
              <div className={movieDetailsCSS.char}>
                <h5 className='mt-2'><Link to={`/cast/${person.id}`}>{person.name}</Link></h5>
                <p >{person?.known_for_department}</p>

              </div>
            </div>
          })}
        </div>
        <div className="text-end">
          <Link title='All Casts & Crew' className={movieDetailsCSS.all_cast} to={`/castandcrew/${movieInfo.data?.data.id}`}>All Casts & Crew <i class="fa-solid fa-arrow-right"></i></Link>
        </div>
      </div>
    </section>

    {/* */}
    <section className={movieDetailsCSS.related_movies}>
      <div className="container">
        <div className="special_title">
          <h2>related movies</h2>
        </div>

        <div className="">
          <Slider {...settings} className="row justify-content-center">

            {relatedMovies.data?.data.results?.map((movie, index) => {
              return <div key={index} class="col-md-3 col-4 px-1 " >
                <div className={"position-relative overflow-hidden " + movieDetailsCSS.slide}>

                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                  <div className={movieDetailsCSS.overLay}>
                    <p className="m-0"><i class="fa-solid fa-star"></i> {movie.vote_average} </p>
                  </div>

                  <div className={movieDetailsCSS.overLayBtn}>
                    <div className={movieDetailsCSS.btn}>
                      <Link to={`/moviesDetails/${movie.id}`}>read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </Slider>
          <div className="text-end">
            <Link title='view Similar Movies' className={movieDetailsCSS.all_cast} to={`/similar/${movieInfo.data?.data.id}`}>View all Similar Movies <i class="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>

      </div>
    </section>
    {/*  */}
    <section className={movieDetailsCSS.related_movies + " " + movieDetailsCSS.recomendation}>
      <div className="container">
        <div className="special_title">
          <h2>Recommendations
          </h2>
        </div>

        <div className="">
          <Slider {...settings} className="row justify-content-center">

            {recomendatinMovies.data?.data.results?.map((movie, index) => {
              return <div key={index} class="col-md-3 col-4 px-1 " >
                <div className={"position-relative overflow-hidden " + movieDetailsCSS.slide}>

                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                  <div className={movieDetailsCSS.overLay}>
                    <p className="m-0"><i class="fa-solid fa-star"></i> {movie.vote_average} </p>
                  </div>

                  <div className={movieDetailsCSS.overLayBtn}>
                    <div className={movieDetailsCSS.btn}>
                      <Link to={`/moviesDetails/${movie.id}`}>read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </Slider>
          <div className="text-end">
            <Link title='vew all recomendation movies' className={movieDetailsCSS.all_cast} to={`/recommendations/${movieInfo.data?.data.id}`}>View all recomendation Movies <i class="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>

      </div>
    </section>
  </>

}
