import React from 'react'
import "../components/TabStyles.css";
import errorRoute from "../Imgs/errorRoute.png"
const ErrorRoute = () => {
    return (
        <div id="wrapper">
            <img src={errorRoute} />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div>
    )
}

export default ErrorRoute