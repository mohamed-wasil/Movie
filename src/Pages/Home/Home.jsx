import React from 'react'
import homeCSS from './Home.module.css'
import HomeSlider from '../../Components/HomeSlider/HomeSlider'
import { Link, Outlet } from 'react-router-dom'
import TeaterSlider from '../../Components/TeaterSlider/TeaterSlider'
import TvSlider from '../../Components/TvSlider/TvSlider'

export default function Home() {
  return <>
    <section className={homeCSS.home}>
      <HomeSlider />
    </section>

    <section className={homeCSS.teater}>
      <div className="container ">
        <div className="row">
          <div className="col-md-8">
            <TeaterSlider />

            {/* -------------------------------------- */}
           
            <div className="mt-5">

             <TvSlider />
            </div>

          </div>
          <div className="col-md-4">
            <div className="ps-md-5">
              <div className={homeCSS.sb_title}>
                <h2>Spotlight Celebrities</h2>
              </div>
              <div className={homeCSS.celeb_item}>
                <Link to="/"><img src={require('../../Images/ava1.jpg')} alt="person1" /></Link>
                <div className={homeCSS.celeb_auther}>
                  <h6><Link to="/">Samuel N. Jack</Link></h6>
                  <span>Actor</span>
                </div>
              </div>
              <div className={homeCSS.celeb_item}>
                <Link to="/"><img src={require('../../Images/ava2.jpg')} alt="person2" /></Link>
                <div className={homeCSS.celeb_auther}>
                  <h6><Link to="/">Benjamin Carroll</Link></h6>
                  <span>Actor</span>
                </div>
              </div>
              <div className={homeCSS.celeb_item}>
                <Link to="/"><img src={require('../../Images/ava3.jpg')} alt="person3" /></Link>
                <div className={homeCSS.celeb_auther}>
                  <h6><Link to="/"> Beverly Griffin</Link></h6>
                  <span>Actor</span>
                </div>
              </div>
              <div className={homeCSS.celeb_item}>
                <Link to="/"><img src={require('../../Images/ava4.jpg')} alt="person4" /></Link>
                <div className={homeCSS.celeb_auther}>
                  <h6><Link to="/">Justin Weaver</Link></h6>
                  <span>Actor</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  */}

    <section className={homeCSS.breaking_bad}>
      <div className="container">

        <div className="">
          <iframe className='w-100' height="500" src="https://www.youtube.com/embed/ceqOTZnhgY8?si=_oPXcfN9ktPQeZu3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </section>


    {/*  */}
    <section className={homeCSS.news}>
      <div className="container">
        <div className={homeCSS.news_banner}>
          <img src={require('../../Images/ads2.png')} alt="" />
        </div>
        <div className="special_title">
          <h2>Latest News</h2>
        </div>

        <div className={homeCSS.tabs}>
          <div className="row">
            <div className="col-md-2">
              <img src={require('../../Images/blog-it1.jpg')} alt="blog-1" />
            </div>
            <div className="col-md-7">
              <h3>Brie Larson to play first female white house candidate Victoria Woodull in Amazon film</h3>
              <span className={homeCSS.time}>13 hours ago</span>
              <p>Exclusive:  <span>Amazon Studios </span> has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span>
                polsed to produce, and play the first female candidate for the presidency of the United States. Amazon bought it in a pitch package deal. <span>
                  Ben Kopit
                </span>, who wrote the Warner Bros film <span>Libertine</span> that has...
              </p>
            </div>
          </div>
        </div>

        <div className={homeCSS.more_news}>
          <div className={homeCSS.sec_title}>
            <h4>More news on Blockbuster</h4>
          </div>
          <div className="row w-md-75">
            <div className="col-md-6">
              <div className={homeCSS.more_it}>
                <h3>Michael Shannon Frontrunner to play Cable in “Deadpool 2”</h3>
                <span className={homeCSS.time}>13 hours ago</span>
              </div>
              <div className={homeCSS.more_it}>
                <h3>French cannibal horror “Raw” inspires L.A. theater to hand out “Barf Bags”</h3>
                <span className={homeCSS.time}>13 hours ago</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className={homeCSS.more_it}>
                <h3>Laura Dern in talks to join Justin Kelly’s biopic “JT Leroy”</h3>
                <span className={homeCSS.time}>13 hours ago</span>
              </div>
              <div className={homeCSS.more_it}>
                <h3>China punishes more than 300 cinemas for box office cheating</h3>
                <span className={homeCSS.time}>13 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
