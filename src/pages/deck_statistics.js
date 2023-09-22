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
const fetchDeckBarData = async (deck, setDeckBarData) => {
    try {
        const response = await axios.get(`http://localhost:3006/statistics/get_5_recent_scores/${deck}`);
        const barData = response.data;

        if (Array.isArray(barData)) {
            setDeckBarData(barData);
        } else {
            console.error("Received data is not an array");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



const Deck_statistics = ({ deck }) => {  // 'deck' passed as a prop here

    const [deckCoverageData , setDeckCoverageData ] = useState(0)
    const [deckBarData , setDeckBarData ] = useState([]) ;

    useEffect(() => {
        if (deck) {
            fetchDeckCoverageData(deck, setDeckCoverageData);
            fetchDeckBarData(deck, setDeckBarData);
        }
    }, [deck]);  // Dependency array includes 'deck'

    // run functions

   // fetchDeckCoverageData()
   // fetchDeckBarData()

    const averageScore = deckBarData.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / deckBarData.length;

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
                <PieChart rawdata={deckCoverageData} />
            </div>
            <div style={barChartStyle}>
                <h2> Average Score:     {averageScore} </h2>

                <Barchart data={deckBarData} />
            </div>
        </div>
    );
};

export  default  Deck_statistics