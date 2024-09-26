import React from 'react'
import loadingCSS from './LoadingScreen.module.css'

export default function LoadingScreen() {
    return <>
        <div className={loadingCSS.loading_layout}>
            <span className={loadingCSS.loader}></span>
        </div>
    </>
}
