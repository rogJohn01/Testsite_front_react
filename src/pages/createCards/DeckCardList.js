import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import API from "../../services/axiosConfig";
import { useParams } from 'react-router-dom';


const columns = [
    { field: 'word_id', headerName: 'ID', width: 90, type: 'number' },
    { field: 'word_front', headerName: 'Front', width: 150 },
    {
        field: 'word_back',
        headerName: 'Back',
        width: 200,
        flex: 1,
        renderCell: (params) => (
            <div
                style={{
                    width: '100%', // Use full width of the cell
                    maxHeight: '100px', // Set maximum height for the cell content
                    overflowY: 'auto', // Enable vertical scrolling
                    whiteSpace: 'normal', // Allows text to wrap to the next line
                    wordBreak: 'break-word', // Ensures words that are too long for the width will be broken and wrapped to the next line
                }}
            >
                {params.value}
            </div>
        ),

        },
    { field: 'deck', headerName: 'Deck', width: 150 },
];



function DeckCardList() {
    const [rows, setRows] = useState([]);
    const { deck_name } = useParams(); // Access route parameter

    useEffect(() => {
        API.get(`${process.env.REACT_APP_API_URL}:3006/words_all/${deck_name}`) // Use deckName in the request
            .then(response => {
                console.log(response.data )
                setRows(response.data.map((row, index) => ({ ...row, id: index }))); // Ensure rows have a unique 'id' prop
                console.log(rows)
            })
            .catch(error => console.log(error));
    }, [deck_name]); // Re-run effect if deckName changes


    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                rowHeight={130} // Adjust the height as needed

            />
        </div>
    );
}

export default DeckCardList;
