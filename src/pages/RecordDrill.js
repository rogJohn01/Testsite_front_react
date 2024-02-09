import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegLaughWink } from 'react-icons/fa';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
    { field: 'drill_id', headerName: 'Drill ID', width: 100 },
    { field: 'drill_deck', headerName: 'Drill Deck', width: 100 },
    { field: 'test_result', headerName: 'Drill Result', width: 100 },
    {
        field: 'test_result_per',
        headerName: 'drill Result Per',
        width: 100,
        valueFormatter: (params) => `${params.value} %`
    },
    { field: 'test_date', headerName: 'Drill Date', width: 100 },
    {
        field: 'view_link',
        headerName: 'View Detail',
        width: 150,
        renderCell: (params) => (
            <a href={`${process.env.REACT_APP_API_URL}:3000/reviewDrillTable/${params.id}`} target="_blank" rel="noopener noreferrer">
                Review <FaRegLaughWink />
            </a>
        ),
    },
];

export default function RecordDrill() {
    const [content, setContent] = useState([]);
    const fetchTableResult = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}:3006/record/drill_table`;
            const response = await axios.get(url);
            const data = response.data;
            setContent(data);
        } catch (error) {
            console.error("Error fetching table results", error);
        }
    };

    useEffect(() => {
        fetchTableResult();
    }, []);

    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={content}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 100]}
                getRowId={(row) => row.drill_id}  // Add this line
                checkboxSelection
                sortModel={[
                    {
                        field: 'drill_id',
                        sort: 'desc',
                    },
                ]}
            />
        </Paper>
    );
}
