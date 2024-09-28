import React from 'react'
import peopleCSS from './People.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import maleImage from '../../Images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
import femaleImage from '../../Images/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'


export default function People() {
    // const [nameOfSort, setNameOfSort] = useState(localStorage.getItem('movieSortOfName') ? localStorage.getItem('movieSortOfName') : "Popular")


    async function getPopularPeople() {
        return await axios.get(`https://api.themoviedb.org/3/person/popular?language=en-US&page=1`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGUxZmNhMzQ4NjkxYWY2OGY2NDNiNGE0YzVlNzgzNiIsIm5iZiI6MTcyNjM0MDg1NS4xMjA0Niwic3ViIjoiNjU3Mzg0MzgyODExYTEwMTM4YTYzNThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.j_AmJvPZQjKl3GEXVK23QpDq3RJ5SyO7oDsfqGWVVTE',
                accept: "application/json"
            }
        })
    }
    const popularPeople = useQuery("getPopularPeople", getPopularPeople);
    // console.log(popularPeople.data.data.results[2].known_for[0].title);

    // handle loading
    if (popularPeople.isLoading) {
        return <LoadingScreen />
    }
    return <>

        <section className={peopleCSS.banner}>
            <div className={peopleCSS.hero}>
                <div className="container">
                    <div className="text-center  ">
                        <h1>Popular People</h1>
                        <div className={peopleCSS.banner_text}>
                            <Link to='/' >Home</Link>
                            <i class="fa-solid fa-chevron-right"></i>
                            <span>Popular</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*  */}

        <section className={peopleCSS.movie}>
            <div className="container">
                <div className="special_title d-flex justify-content-between">
                    <h2>Popular Movies </h2>
                </div>
                <div className="row  gy-4">
                    {popularPeople.data?.data.results.map((person, index) => {
                        return <div key={index} class="col-lg-2 col-md-3 col-sm-4 col-6 px-1 " >
                            <div className={"position-relative overflow-hidden " + peopleCSS.slide}>
                                <Link to={`/cast/${person.id}`}>
                                    {person.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${person.profile_path} `} alt={person.name} /> : <>
                                        {person.profile_path.gender == 1 ? <img src={femaleImage} alt={person.name} /> :
                                            <img src={maleImage} alt={person.name} />}
                                    </>}
                                </Link>
                                {/* <div className={peopleCSS.overLayBtn}>
                                    <div className={peopleCSS.btn}>
                                        <Link to={`/moviesDetails/${person.id}`}>read more</Link>
                                    </div>
                                </div> */}

                            </div>
                            <div className={peopleCSS.char}>
                                <h5><Link to={`/cast/${person.id}`}>{person.name}</Link></h5>
                                {person.known_for?.map((job , idx) => {
                                   return <p key={idx}>{job?.title} ,</p>
                                })}

                            </div>
                        </div>
                    })}
                </div>

            </div>
        </section>
    </>
}
