import MyResponsiveCalendar from '../components/graphs/calendar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MyPieChart from "../components/graphs/piechart";
import PieChart from "../components/graphs/piechart";
import Barchart from "../components/graphs/barchart";
import Dropdown from "../components/graphs/dropdown";
import { Container } from '@mui/material';
import GetCardDeck from "../apis/form_api";


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
const dataArray = [1, 2, 3, 4, 5]; // This array could be your data source



const Statistics = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [coverageData , setCoverageData ] = useState(0)
    const [barData , setBarData ] = useState([]) ;
    const [deckData, setDeckData] = useState([]);

    const decks = GetCardDeck();


    useEffect(() => {
        fetchCalendarData(setCalendarData);
        fetchCoverageData(setCoverageData);
        fetchBarData(setBarData);
    }, []);

    const handleDropdownChange = (value) => {
        setDeckData(value);
    };



    console.log("Current calendarData state:", calendarData); // Debug line
    console.log("Current coverageData state:", coverageData);  // Debug line
    console.log("Current barData state:", barData);  // Debug line


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
            <div style={{marginBottom: '20px'}}>
                <MyResponsiveCalendar data={calendarData} />
            </div>
            <div style={{marginBottom: '20px'}}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Dropdown
                        dataArray={decks}
                        label="Select Deck"
                        onSelectionChange={handleDropdownChange}
                    />
                    <h2 style={{ marginTop: '20px' }}>{deckData}</h2>
                </Container>
            </div>
            <div style={{marginBottom: '20px'}}>
                <PieChart rawdata={coverageData} />
            </div>
            <div style={barChartStyle}>
                <Barchart data={barData} />
            </div>
        </div>
    );
};


export default Statistics;
