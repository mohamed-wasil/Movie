import React from 'react'
import footerCSS from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <>
    <footer className={footerCSS.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className={footerCSS.logo_ft}>
              <img src={require('../../Images/logo1.png')} alt="logo" />
            </div>
            <p>5th Avenue st, manhattan
              <br />
              New York, NY 10001
            </p>
            <p>Call us: <span>(+01) 202 342 6789</span></p>
          </div>
          <div className="col-md-2">

            <h4>Resources</h4>

            <ul className='list-unstyled p-0'>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">BlackBoster</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Forums</Link></li>
              <li><Link to="/">Blogs</Link></li>
            </ul>
          </div>
          <div className="col-md-2">

            <h4>Legal</h4>

            <ul className='list-unstyled p-0'>
              <li><Link to="/">Terms of Use</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Securety</Link></li>
            </ul>

          </div>
          <div className="col-md-2">

            <h4>Account</h4>

            <ul className='list-unstyled p-0'>
              <li><Link to="/">My Account</Link></li>
              <li><Link to="/">BlackBoster</Link></li>
              <li><Link to="/">WatchList</Link></li>
              <li><Link to="/">Collection</Link></li>
              <li><Link to="/">user Guide</Link></li>
            </ul>

          </div>
          <div className="col-md-2">

            <h4>NewsLetter</h4>

            <p>Subscribe to our newsletter system now
              to get latest news from us.</p>

          </div>
        </div>
      </div>
    </footer>
  </>
}
