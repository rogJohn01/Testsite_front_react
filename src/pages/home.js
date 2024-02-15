import React, { useState, useEffect } from 'react';
import logo from '../assets/images/home_entrance2.jpg';
import Navbar from "../components/Common/navbar";

export default function Home() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);



    const homeContainer = {
        height: '100vh' ,
        width : '100vw' ,
    }

    const imgContainer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Ensure this container fills its parent

    };


    const imgStyle = {
        height: '100%', // Adjust these values as needed
        width: '100%',
    };


    return (
        <div style={homeContainer}>

            <div style={imgContainer}>

                <img src={logo} alt="Logo" style={imgStyle} />
            </div>


        </div>

    );
}
