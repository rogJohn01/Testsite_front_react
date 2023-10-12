import WordViewTable2 from "../components/word_view/wordViewDatagrid";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';

export default function WordResultTable() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3006/wordview/get_word_view_table')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const dataGridStyle = {
        flex: '1' ,
        marginLeft: '650px',
    };


    return (
        <Paper sx={{ height: '100%', width: '100%' }}>

            <WordViewTable2 data={data} />
        </Paper>

    );
};