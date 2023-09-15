import MyResponsiveCalendar from '../components/graphs/calendar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import MyPieChart from "../components/graphs/piechart";
import PieChart from "../components/graphs/piechart";


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


const Statistics = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [coverageData , setCoverageData ] = useState(0)

    useEffect(() => {
        fetchCalendarData(setCalendarData);
    }, []);

    useEffect(() => {
        fetchCoverageData(setCoverageData);
    }, []);
    console.log("Current calendarData state:", calendarData); // Debug line
    console.log("Current coverageData state:", coverageData);  // Debug line

    return (
        <div>
            <h1>My Statistics</h1>
            <div style={{ height: 1000, width: 800, marginTop: "-120px" }}>
                <MyResponsiveCalendar data={calendarData} />
            </div>
            <div style={{ height: 100, width: 800 ,  marginTop: "-700px" }}>
                <PieChart  rawdata={coverageData}/>
            </div>
        </div>
    );


};

export default Statistics;
