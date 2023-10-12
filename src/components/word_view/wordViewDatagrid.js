import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import "./wordViewTable.css"; // Import the CSS file

const WordViewTable2 = ({ data }) => {
    console.log("Received data:", data);  // Debugging log

    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.word_id]) {
            acc[item.word_id] = {
                word_front: item.word_front,
                data: []
            };
        }
        acc[item.word_id].data.push({ color: item.isCorrect ? 'green' : 'red', date: item.word_date });
        return acc;
    }, {});

    const rows = Object.keys(groupedData).map((wordId, index) => ({
        id: index,
        word_front: groupedData[wordId].word_front,
        word_id: wordId.toString(),
        ...groupedData[wordId].data.reduce((acc, { color, date }, i) => {
            acc[`dot${i + 1}`] = { color, date };
            return acc;
        }, {}),
    }));

    console.log("Generated rows:", rows);  // Debugging log

    const maxDots = Math.max(...Object.values(groupedData).map(arr => arr.data.length));

    const columns = [
        { field: 'word_front', headerName: 'Word', width: 150 }, // New column for word_front
        { field: 'word_id', headerName: 'Word ID', width: 150 },
        ...Array.from({ length: maxDots }, (_, i) => ({
            field: `dot${i + 1}`,
            headerName: `Dot ${i + 1}`,
            width: 100,
            renderCell: (params) => (
                <Tooltip title={params.value ? params.value.date : ''} arrow>
                    <div style={{ color: params.value?.color || 'white', fontSize: '50px' }}>
                        •
                    </div>
                </Tooltip>
            ),
        })),
    ];

    console.log("Generated columns:", columns);  // Debugging log

    return (
        <div style={{ height: '100vh', width: 'calc(100% - 300px)', marginLeft: '650px', margin: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
};

export default WordViewTable2;
