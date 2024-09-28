import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import tvDetailsCSS from './TvDetails.module.css'
import Slider from 'react-slick'
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen'

export default function TvDetails() {
  const { id } = useParams()

  async function getMovieDetails() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const movieInfo = useQuery("getMovieDetails", getMovieDetails , {
    refetchInterval: 500,
  });

  async function getCasts() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const castInfo = useQuery("getCasts", getCasts)

  async function getRelatedMovies() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
        accept: "application/json"
      }
    })
  }
  const relatedMovies = useQuery("getRelatedMovies", getRelatedMovies);

  async function getRecomedationMovies() {
    return await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, {
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
    slidesToScroll: 3,
    // autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 9000,
    autoplaySpeed: 0,
    cssEase: "linear",
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
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // }
    ]

  };

  const lastSeason = movieInfo.data?.data.seasons?.[movieInfo.data.data.seasons.length -1];

  return <>

    <section className={tvDetailsCSS.main_sec} style={{ background: `url(https://image.tmdb.org/t/p/original/${movieInfo.data?.data.backdrop_path})` }}>
      <div className={tvDetailsCSS.main_div}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-sm-12">
              <div className={tvDetailsCSS.image}>
                <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.data?.data.poster_path}`} alt={movieInfo.data?.data.original_name} />
              </div>
            </div>
            <div className="col-lg-8  col-md-7 col-sm-12">
              <div className={tvDetailsCSS.content}>
                <h1>{movieInfo.data?.data.original_name} <span className='opacity-75'>({movieInfo.data?.data.first_air_date?.slice(0, 4)})</span></h1>
                <div className={tvDetailsCSS.genres_box}>
                  {movieInfo.data?.data.genres.map((gen, ind) => { return <span key={ind} className={tvDetailsCSS.genres}>{gen.name}</span> })}
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
    <section className={tvDetailsCSS.casts}>
      <div className="container">
        <div className="special_title">
          <h2>Series Cast</h2>
        </div>
        <div className="row gy-lg-0 gy-3">
          {castInfo.data?.data.cast?.slice(0, 6).map((cast, ind) => {
            return <div key={ind} className="col-lg-2 col-md-3 col-sm-4 col-6 px-1">
              <div className={tvDetailsCSS.cast_item}>
                <div className={tvDetailsCSS.cast_img}>
                  <Link to={`/cast/${cast.id}`}><img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt={cast.name} /></Link>
                </div>
                <div className={tvDetailsCSS.cast_info}>
                  <h3><Link to={`/cast/${cast.id}`}>{cast.name}</Link></h3>
                  <p>{cast.known_for_department}</p>
                </div>
              </div>
            </div>
          })}

        </div>
        <div className="text-end">
          <Link title='vew all cast and crew' className={tvDetailsCSS.all_cast} to={`/cast/${movieInfo.data?.data.name}/${movieInfo.data?.data.id}`}>Full Cast & Crew <i class="fa-solid fa-arrow-right"></i></Link>
        </div>
      </div>
    </section>
    {/* */}

    <section className={tvDetailsCSS.last_season}>
      <div className="container">
        <div className="special_title">
          <h2>Last Season</h2>
        </div>
        {movieInfo.data?.data.seasons?.length > 1 ? <div class={tvDetailsCSS.season}>
          <div class="row align-items-center">
            <div className="col-lg-2 col-md-3">
              <div className={tvDetailsCSS.season_cover}>
                <Link to={`/season/${id}/${lastSeason?.season_number}`}> <img src={`https://image.tmdb.org/t/p/original/${lastSeason?.poster_path}`} alt={lastSeason?.name} /></Link>
              </div>
            </div>
            <div className="col-lg-10 col-md-9 mt-md-0 mt-4">
              <h5 class={tvDetailsCSS.season_title}>
                <Link to={`/season/${id}/${lastSeason?.season_number}`}>
                  {lastSeason?.name}
                  {lastSeason?.air_date?.slice(0, 4) ? <span>({lastSeason?.air_date?.slice(0, 4)})</span> : null}
                </Link>

              </h5>
              <div className={tvDetailsCSS.season_info}>
                <span><i class="fa-solid fa-star me-1"></i> {lastSeason?.vote_average}</span>
                <span>{lastSeason?.episode_count} Episodes</span>
              </div>
              <p class={"card-text "+tvDetailsCSS.season_overview}>{lastSeason?.overview}</p>
              <div className="text-end">
                <Link title='vew all cast and crew' className={tvDetailsCSS.all_cast} to={`/seasons/${id}`}>View all Seasons <i class="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>

          :
          <div class={tvDetailsCSS.season}>
            <div class="row align-items-center">
              <div className="col-md-2">
                <div className="">
                  <Link to={`/season/${id}/${lastSeason?.season_number}`}> <img src={`https://image.tmdb.org/t/p/original/${lastSeason?.poster_path}`} alt={lastSeason?.name} /></Link>
                </div>
              </div>
              <div className="col-md-10">
                <h5 class={tvDetailsCSS.season_title}>
                  <Link to={`/seasons/${id}/${lastSeason?.season_number}`}>
                    {lastSeason?.name}
                    <span>({lastSeason?.air_date?.slice(0, 4)})</span></Link>
                </h5>
                <div className={tvDetailsCSS.season_info}>
                  <span><i class="fa-solid fa-star me-1"></i> {lastSeason?.vote_average}</span>
                  <span>{lastSeason?.episode_count} Episodes</span>
                </div>
                <p class="card-text">{lastSeason?.overview}</p>
                <div className="text-end">
                  <Link title='View Season Details' className={tvDetailsCSS.all_cast} to={`/season/${id}/${lastSeason?.season_number}`}>View Season Details<i class="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    </section>
    {/*  */}

    <section className={tvDetailsCSS.related_movies}>
      <div className="container">
        <div className="special_title">
          <h2>related movies</h2>
        </div>
        <div className="">
          <Slider {...settings} className="row justify-content-center">

            {relatedMovies.data?.data.results?.map((movie, index) => {
              return <div key={index} class="col-md-3 col-4 px-1 " >
                <div className={"position-relative overflow-hidden " + tvDetailsCSS.slide}>

                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                  <div className={tvDetailsCSS.overLay}>
                    <p className="m-0"><i class="fa-solid fa-star"></i> {movie.vote_average} </p>
                  </div>

                  <div className={tvDetailsCSS.overLayBtn}>
                    <div className={tvDetailsCSS.btn}>
                      <Link to={`/tvDetails/${movie.id}`}>read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </Slider>
          <div className="text-end">
            <Link title='vew all Similar Series' className={tvDetailsCSS.all_cast} to={`/tvSimilar/${movieInfo.data?.data.id}`}>View all Similar series <i class="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>

      </div>
    </section>
    {/*  */}
    <section className={tvDetailsCSS.related_movies + " " + tvDetailsCSS.recomendation}>
      <div className="container">
        <div className="special_title">
          <h2>Recommendations </h2>
         
        </div>

        <div className="">
          <Slider {...settings} className="row justify-content-center">

            {recomendatinMovies.data?.data.results?.map((movie, index) => {
              return <div key={index} class="col-md-3 col-4 px-1 " >
                <div className={"position-relative overflow-hidden " + tvDetailsCSS.slide}>

                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path} `} alt={movie.title} />
                  <div className={tvDetailsCSS.overLay}>
                    <p className="m-0"><i class="fa-solid fa-star"></i> {movie.vote_average} </p>
                  </div>

                  <div className={tvDetailsCSS.overLayBtn}>
                    <div className={tvDetailsCSS.btn}>
                      <Link to={`/tvDetails/${movie.id}`}>read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </Slider>
          <div className="text-end">
            <Link title='vew all Recomendation series' className={tvDetailsCSS.all_cast} to={`/tvRecommendations/${movieInfo.data?.data.id}`}>View all Recommendations <i class="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>

      </div>
    </section>
  </>

}
