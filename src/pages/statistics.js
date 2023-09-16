import MyResponsiveCalendar from '../components/graphs/calendar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MyPieChart from "../components/graphs/piechart";
import PieChart from "../components/graphs/piechart";
import Barchart from "../components/graphs/barchart";


const formatCalendarData = (apiData) => {
    return apiData.map(item => {
        const localDate = moment.utc(item.dates).local().format('YYYY-MM-DD');
        return {
            value: item.date_count,
            day: localDate
        };
    });
};


const fetchCalendarData = async (setCalendarData) => {
    try {
        const response = await axios.get('http://localhost:3006/statistics/get_calendar');
        const formattedData = formatCalendarData(response.data);
        console.log("Formatted data:", formattedData); // Debug line
        setCalendarData(formattedData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};


const fetchCoverageData = async (setCoverageData) => {
    try {
        const response = await axios.get('http://localhost:3006/statistics/get_coverage/barron800');
        const coverageData = response.data
        // Convert string to float
        if (isNaN(coverageData)) {
            console.error('Could not convert coverageData to float');
            return;
        }
        setCoverageData(coverageData)
        console.log("from fetching: ", coverageData)
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};


const fetchBarData = async (setBarData) => {
    try {
        const response = await axios.get('http://localhost:3006/statistics/get_5_recent_scores/barron800');
        const barData = response.data;

        console.log("bardata from api: ", barData);

        // Check if barData is an array or object
        if (Array.isArray(barData) || typeof barData === 'object') {
            console.log("Received complex data type.");
        }


        setBarData(barData);

        // Debugging the state update (This will not reflect the update immediately)
        console.log("from fetching bardata: ", barData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};


const Statistics = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [coverageData , setCoverageData ] = useState(0)
    const [barData , setBarData ] = useState([]) ;

    useEffect(() => {
        fetchCalendarData(setCalendarData);
        fetchCoverageData(setCoverageData);
        fetchBarData(setBarData);
    }, []);


    console.log("Current calendarData state:", calendarData); // Debug line
    console.log("Current coverageData state:", coverageData);  // Debug line
    console.log("Current barData state:", barData);  // Debug line


    const data = [
        { test: 'Test 1', score: 90 },
        { test: 'Test 2', score: 85 },
        { test: 'Test 3', score: 78 },
        { test: 'Test 4', score: 94 },
        { test: '2022-9-39', score: 88 },
    ];
    const averageScore = barData.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / barData.length;


    const calendarStyle = {
        height: 1000,
        width: 800,
        marginTop: "-120px"
    };

    const pieChartStyle = {
        height: 100,
        width: 800,
        marginTop: "-700px",
        marginBottom: "200px"  // Added margin between PieChart and the division below
    };

    const containerStyle = {
        height: '450px',
        width: '600px',
        position: 'relative'
    };

    const scoreHeaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '-50px',
        left: '0',
        right: '0',
        zIndex: '1'
    };

    const barChartStyle = {
        height: '400px',
        position: 'relative',
        zIndex: '0',
        marginTop: '60px'
    };

        return (
            <div>
                <h1>My Statistics</h1>
                <div style={calendarStyle}>
                    <MyResponsiveCalendar data={calendarData} />
                </div>
                <div style={pieChartStyle}>
                    <PieChart rawdata={coverageData} />
                </div>
                <div style={containerStyle}>
                    <div style={scoreHeaderStyle}>
                        <h2 style={{ marginRight: '16px' }}>Test Scores: </h2>
                        <h2>Average: {averageScore.toFixed(2)}</h2>
                    </div>
                    <div style={barChartStyle}>
                        <Barchart data={barData} />
                    </div>
                </div>
            </div>
        );



};

export default Statistics;
