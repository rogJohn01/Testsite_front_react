import WordViewTable2 from "../components/word_view/wordViewDatagrid";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <WordViewTable2 data={data} />
        </div>
    );
};