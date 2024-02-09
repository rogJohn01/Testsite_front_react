import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const FloatingButtons = () => {
    const containerStyle = {
        position: 'fixed', // This keeps the container fixed during scrolling
        top: '10px',       // Distance from the top of the viewport
        right: '10px',     // Distance from the right of the viewport
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: 'black',      // Adjust the text color as needed
        border: '1px solid black',  // Optional: add a border
        boxShadow: 'none',  // Remove box shadow
        textTransform: 'none',  // Prevent uppercase transformation
    };

    return (
        <div style={containerStyle}>
            <Button style={buttonStyle} variant="outlined">
                <Link to="/signin" variant="body2">

                Sign In
                </Link>

            </Button>
            <Button style={buttonStyle} variant="outlined">
                <Link to="/signup" variant="body2">

                Sign Up
                </Link>

            </Button>
        </div>
    );
};

export default FloatingButtons;
