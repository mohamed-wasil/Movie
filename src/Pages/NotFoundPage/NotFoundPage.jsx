import React from 'react'
import notFoundCSS from './NotFoundPage.module.css'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return <>
        <div className={notFoundCSS.error_layout}>
            <div className={notFoundCSS.error_container}>
                <h1> 404 </h1>
                <p>
                    Oops! The page you're
                    looking for is not here.
                </p>
                <Link to='/'>
                    Go Back to Home
                </Link>
            </div>
        </div>
    </>
}
