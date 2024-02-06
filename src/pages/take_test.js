import { wordContext } from '../contexts/wordContext';
import SetupForm from '../components/SetupForm/SetupForm';
import Flash7 from '../components/Flashcard/flashcard';
import React, { useContext, useState } from 'react';
import ModalWindow from '../components/Common/modal';
import Navbar from "../components/Common/navbar";

export default function Take_test(){


    const {ready , setReady} = useContext(wordContext)
    const {testFinished , setTestFinished} = useContext(wordContext) 

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // This can be set to the height you want your content centered in
    };

    return (
        <div>

            <div style={containerStyle}>
                {!ready && <SetupForm/>}
                {ready && !testFinished && <Flash7/> }
                {testFinished && <ModalWindow/>}
            </div>

            <div>
                <Navbar/>
            </div>
        </div>

    );
}