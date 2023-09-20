import React, {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import PieChart from "../components/graphs/piechart";
import Barchart from "../components/graphs/barchart";



const fetchDeckCoverageData = async ( deck , setDeckCoverageData) => {
    try {
        const response = await axios.get(`http://localhost:3006/statistics/get_coverage/${deck}`);
        const coverageData = response.data;
        // Convert string to float
        if (isNaN(coverageData)) {
            console.error('Could not convert coverageData to float');
            return;
        }
        setDeckCoverageData(coverageData);
        console.log("from fetching: ", coverageData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};


const fetchDeckBarData = async (deck , setDeckBarData) => {
    try {
        const response = await axios.get(`http://localhost:3006/statistics/get_5_recent_scores/${deck}`);
        const barData = response.data;

        console.log("bardata from api: ", barData);

        // Check if barData is an array or object
        if (Array.isArray(barData) || typeof barData === 'object') {
            console.log("Received complex data type.");
        }


        setDeckBarData(barData);

        // Debugging the state update (This will not reflect the update immediately)
        console.log("from fetching bardata: ", barData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};





const Deck_statistics = () => {

    const [deckCoverageData , setDeckCoverageData ] = useState(0)
    const [deckBarData , setDeckBarData ] = useState([]) ;


    // run functions

   // fetchDeckCoverageData()
   // fetchDeckBarData()


    // css

    const barChartStyle = {
        height: '400px',
        position: 'relative',
        zIndex: '0',
        marginTop: '60px'
    };




    return (
        <div>
            <h1> deck  Statistics</h1>


            <div style={{marginBottom: '20px'}}>
                <PieChart rawdata={coverageData} />
            </div>
            <div style={barChartStyle}>
                <h2> Average Score:     {averageScore} </h2>

                <Barchart data={barData} />
            </div>
        </div>
    );
};