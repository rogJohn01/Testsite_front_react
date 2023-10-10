import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./wordViewTable.css"; // Import the CSS file


const generateSampleData = (numRows) => {
    const sampleData = [];
    for (let i = 1; i <= numRows; i++) {
        const word_id = Math.floor(Math.random() * 50) + 1;
        const isCorrect = Math.floor(Math.random() * 2);
        sampleData.push({
            id: i,
            word_id,
            isCorrect,
        });
    }
    return sampleData;
};

const WordViewTable2 = ({ numRows = 50 }) => {
    const rawData = generateSampleData(numRows);
    const groupedData = rawData.reduce((acc, item) => {
        if (!acc[item.word_id]) {
            acc[item.word_id] = [];
        }
        acc[item.word_id].push(item.isCorrect ? 'green' : 'red');
        return acc;
    }, {});

    const rows = Object.keys(groupedData).map((wordId, index) => ({
        id: index,
        word_id: wordId,
        ...groupedData[wordId].reduce((acc, color, i) => {
            acc[`dot${i + 1}`] = color;
            return acc;
        }, {}),
    }));

    const maxDots = Math.max(...Object.values(groupedData).map(arr => arr.length));
    const columns = [
        { field: 'word_id', headerName: 'Word ID', width: 150 },
        ...Array.from({ length: maxDots }, (_, i) => ({
            field: `dot${i + 1}`,
            headerName: `Dot ${i + 1}`,
            width: 100,
            renderCell: (params) => (
                <div style={{ color: params.value || 'gray', fontSize: '24px' }}>•</div>
            ),
        })),
    ];

    return (
        <div style={{ height: 400, width: '100%', margin: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
};


export default WordViewTable2;