import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import "./wordViewTable.css"; // Import your CSS file

const generateSampleData = (numRows) => {
    const sampleData = [];
    for (let i = 1; i <= numRows; i++) {
        const word_id = Math.floor(Math.random() * 50) + 1;
        const isCorrect = Math.floor(Math.random() * 2);
        const word_date = `2023-${Math.floor(Math.random() * 12) + 1}-${
            Math.floor(Math.random() * 28) + 1
        }`;
        const test_id = Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : null;
        const drill_id = test_id ? null : Math.floor(Math.random() * 10) + 1;
        sampleData.push({
            id: i,
            word_id,
            isCorrect,
            word_date,
            test_id,
            drill_id,
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
        acc[item.word_id].push(item);
        return acc;
    }, {});

    const rows = Object.keys(groupedData).map((wordId, index) => {
        return {
            id: index,
            word_id: wordId,
            ...groupedData[wordId].reduce((acc, data, i) => {
                acc[`dot${i + 1}`] = data;
                return acc;
            }, {}),
        };
    });

    const maxDots = Math.max(...Object.values(groupedData).map(arr => arr.length));
    const columns = [
        { field: 'word_id', headerName: 'Word ID', width: 150 },
        ...Array.from({ length: maxDots }, (_, i) => ({
            field: `dot${i + 1}`,
            headerName: `Dot ${i + 1}`,
            width: 100,
            renderCell: (params) => {
                const tooltipContent = [
                    `Date: ${params.value?.word_date || 'N/A'}`,
                    `Test ID: ${params.value?.test_id !== null ? params.value.test_id : 'N/A'}`,
                    `Drill ID: ${params.value?.drill_id !== null ? params.value.drill_id : 'N/A'}`
                ].join('\n');

                return (
                    <Tooltip title={<pre>{tooltipContent}</pre>} arrow>
                        <div style={{ color: params.value?.isCorrect ? 'green' : 'red', fontSize: '50px' }}>
                            •
                        </div>
                    </Tooltip>
                );
            },
        })),
    ];

    return (
        <div style={{ height: '100vh', width: '100%', margin: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
};

export default WordViewTable2;
