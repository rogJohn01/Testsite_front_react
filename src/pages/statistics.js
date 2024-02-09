import MyResponsiveCalendar from '../components/graphs/calendar';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import MyPieChart from "../components/graphs/piechart";
import PieChart from "../components/graphs/piechart";
import Barchart from "../components/graphs/barchart";
import Dropdown from "../components/graphs/dropdown";
import GetCardDeck from "../apis/form_api";
import {wordContext} from "../contexts/wordContext";
import { Button, Container } from '@mui/material';
import Deck_statistics from "./deck_statistics"

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}:3006/statistics/whole/get_calendar`);
        const formattedData = formatCalendarData(response.data);
        console.log("Formatted data:", formattedData); // Debug line
        setCalendarData(formattedData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};

const fetchCoverageData = async ( setCoverageData) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}:3006/statistics/whole/get_coverage/`);
        const coverageData = response.data;
        // Convert string to float
        if (isNaN(coverageData)) {
            console.error('Could not convert coverageData to float');
            return;
        }
        setCoverageData(coverageData);
        console.log("from fetching: ", coverageData);
    } catch (error) {
        console.error('Error fetching calendar data:', error);
    }
};


const fetchBarData = async (setBarData) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}:3006/statistics/whole/get_5_recent_scores/`);
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
    const [deckData, setDeckData] = useState([]);
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const [showMainStatistics, setShowMainStatistics] = useState(true);


    const decks = GetCardDeck();

    const { statisticsDeck , SetStatisticsDeck } = useContext(wordContext)


    useEffect(() => {
        fetchCalendarData(setCalendarData);
        fetchCoverageData( setCoverageData);
        fetchBarData(setBarData);
    }, []);

    const handleDropdownChange = (value) => {
        setDeckData(value);
        setIsDropdownClicked(true); // set it to true when dropdown is clicked

    };

    const handleCombinedButtonActions = () => {
        setIsDropdownClicked(false);
        setShowMainStatistics(true);
    };

    const handleCombinedDropdownChange = (value) => {
        handleDropdownChange(value);
        setShowMainStatistics(false );
    };

    console.log("Current calendarData state:", calendarData); // Debug line
    console.log("Current coverageData state:", coverageData);  // Debug line
    console.log("Current barData state:", barData);  // Debug line


    const averageScore = barData.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / barData.length;

    // css
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

    const buttonAndDropdownStyle = {
        width: '150px',
        height: '40px',
        backgroundColor: 'red'  // Temporarily add this line

    };

    const Main_statistics = {

    }


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
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        style={{
                            width: '250px',
                            height: '50px',
                            marginLeft: '20px',
                            backgroundColor: isDropdownClicked ? 'transparent' : 'rgba(128, 128, 128, 0.3)',
                            color: 'black'
                        }}
                        onClick={handleCombinedButtonActions}
                    >
                        Whole - deck
                    </Button>

                    <Dropdown
                        dataArray={decks}
                        label="Select Deck"
                        onSelectionChange={handleCombinedDropdownChange}
                        style={{
                            width: '250px',
                            height: '50px',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                        }}
                    />
                </Container>
                <h2 style={{ marginTop: '20px' }}>
                    {isDropdownClicked ? deckData: "whole deck"}
                </h2>

            </div>
            { showMainStatistics ? (
                <div className={Main_statistics}>
                    <div style={{marginBottom: '20px'}}>
                        <PieChart rawdata={coverageData} />
                    </div>
                    <div style={barChartStyle}>
                        <h2> Average Score: {averageScore} </h2>
                        <Barchart data={barData} />
                    </div>
                </div>
            ) : (
                <Deck_statistics deck={deckData} /> // 'deckData' is passed as 'deck' prop here
            )}


        </div>
    );
};


export default Statistics;
