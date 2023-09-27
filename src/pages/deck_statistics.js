import React, {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import PieChart from "../components/graphs/piechart";
import Barchart from "../components/graphs/barchart";



const fetchDeckCoverageData = async ( deck ,setDeckCoverageData , setDeckCoverageRatioData) => {
    try {
        const response = await axios.get(`http://localhost:3006/statistics/get_coverage/${deck}`);
        const Data = response.data;
        // Convert string to float

        const coveredData = parseFloat(Data[0].count1.toFixed(2)) ;
        const wholeData = Data[0].count2

        const coverageRatioData = parseFloat((coveredData/wholeData).toFixed(2) );
        setDeckCoverageData([coveredData , wholeData])
        setDeckCoverageRatioData(coverageRatioData);
        console.log("from fetching: ", coverageRatioData);
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

    const [deckCoverageRatioData , setDeckCoverageRatioData ] = useState(0)
    const [ deckCoverageData , setDeckCoverageData ] = useState([])
    const [deckBarData , setDeckBarData ] = useState([]) ;

    useEffect(() => {
        if (deck) {
            fetchDeckCoverageData(deck, setDeckCoverageData ,setDeckCoverageRatioData );
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

    const coverageDataStyle = {
        fontSize: '20px' ,
        color:'skyblue'
    }


    return (
        <div>
            <h1> deck  Statistics</h1>
            <div>
                <h3 style={coverageDataStyle}>
                    covered cards: {deckCoverageData[0]}
                </h3>
                <h3 style={coverageDataStyle}>
                    whole cards: {deckCoverageData[1]}
                </h3>
            </div>

            <div style={{marginBottom: '20px'}}>
                <PieChart rawdata={deckCoverageRatioData} />
            </div>
            <div style={barChartStyle}>
                <h2> Average Score:     {averageScore} </h2>

                <Barchart data={deckBarData} />
            </div>
        </div>
    );
};

export  default  Deck_statistics