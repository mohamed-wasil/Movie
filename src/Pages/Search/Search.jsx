import React, { useContext } from 'react'
import { searchContext } from '../../Context/SearchContext'
import searchCSS from './Search.module.css'
import { Link } from 'react-router-dom'
import emptyImage from '../../Images/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg'
import maleImage from '../../Images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
import femaleImage from '../../Images/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'

export default function Search() {
  const { searchResults, setSearchResults, searchType, setSearchType, searchWords } = useContext(searchContext)
  
  return <>
    <section className={searchCSS.last_season}>
      <div className="container">
        <div className="special_title">
          <h2>Search about {searchWords}<span className='opacity-75'>( {searchResults?.length} )</span></h2>
        </div>


        {searchResults?.map((res, idx) => {
          return <>
            <div key={idx} class={searchCSS.season}>
              <div class="row align-items-center">
                <div className="col-md-1">
                  <div className="">
                    {searchType == 'tv' ? <Link to={`/tvDetails/${res.id}`}>
                      {res.poster_path ? <img src={`https://image.tmdb.org/t/p/original/${res.poster_path}`} alt={res.name} /> : <img src={emptyImage} alt={res.name} />}
                    </Link> : ''}

                    {searchType == 'movie' ?
                      <Link to={`/moviesDetails/${res.id}`}>
                        {res.poster_path ? <img src={`https://image.tmdb.org/t/p/original/${res.poster_path}`} alt={res.title} /> : <img src={emptyImage} alt={res.name} />}
                      </Link>
                      : ''}

                    {searchType == 'person' ? <Link to={`/cast/${res.id}`}>
                      { res.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${res.profile_path}`} alt={res.name} />
                          : <>
                            {searchCSS.data?.data.gender == 1 ? <img src={femaleImage} alt={searchCSS.data?.data.name} /> :
                              <img src={maleImage} alt={res.name} />}
                          </>
                      }
                    </Link>
                      : ''}

                  </div>
                </div>
                <div className="col-md-11">
                  <h5 class={searchCSS.season_title}>

                    {searchType == 'tv' ? <Link to={`/tvDetails/${res.id}`}>
                      {res.name}
                      {res.first_air_date?.slice(0, 4) ? <span>({res.first_air_date?.slice(0, 4)})</span> : null}
                    </Link> : ''}

                    {searchType == 'movie' ? <Link to={`/moviesDetails/${res.id}`}>
                      {res.title}
                      {res.release_date?.slice(0, 4) ? <span>({res.release_date?.slice(0, 4)})</span> : null}
                    </Link> : ''}

                    {searchType == 'person' ? <Link to={`/cast/${res.id}`}>
                      {res.name}
                      {<span>({res.known_for_department})</span> }
                    </Link> : ''}


                  </h5>
                  {searchType == 'tv' ? <Link to={`/tvDetails/${res.id}`}>
                      {res.name}
                      <p class="card-text">{res.overview}</p>
                    </Link> : ''}
                  {searchType == 'movie'  ? <Link to={`/moviesDetails/${res.id}`}>
                      {res.name}
                      <p class="card-text">{res.overview}</p>
                    </Link> : ''}

                    {searchType == 'person'  ? <Link to={`/cast/${res.id}`}>
                      {/* {res.name} */}
                      {/* {res.known_for[0]?.name ?   <p class="card-text">{res.known_for[0]?.name}</p> : ''} */}
                    
                    </Link> : ''}
                </div>
              </div>

            </div>



          </>
        })}
      </div>
    </section>

  </>
}
