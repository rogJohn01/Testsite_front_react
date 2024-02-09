import React, { useState, useEffect } from 'react';
import logo from '../assets/images/home_entrance2.jpg';
import Navbar from "../components/Common/navbar";

export default function Home() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imgStyle = {
        height: windowHeight > 1000 ? '80%' : '50%', // Adjust these values as needed
        width: '100%',
    };

    const imgContainer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div>

            <div style={imgContainer}>

                <img src={logo} alt="Logo" style={imgStyle} />
            </div>


        </div>

    );
}
