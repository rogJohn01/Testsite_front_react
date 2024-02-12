import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'word_id', headerName: 'ID', width: 90, type: 'number' },
    { field: 'word_front', headerName: 'Front', width: 150 },
    { field: 'word_back', headerName: 'Back', width: 200, flex: 1 },
    { field: 'deck', headerName: 'Deck', width: 150 },
];

const rows = [
    // Add your rows here. Example:
    { id: 1, word_id: 1, word_front: 'Hello', word_back: '안녕하세요', deck: 'Basic Korean' },
    { id: 1, word_id: 1, word_front: 'Hello', word_back: '안녕하세요', deck: 'Basic Korean' },
    { id: 1, word_id: 1, word_front: 'Hello', word_back: '안녕하세요', deck: 'Basic Korean' },
    { id: 1, word_id: 1, word_front: 'Hello', word_back: '안녕하세요', deck: 'Basic Korean' },
];

function DeckCardList() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default DeckCardList;
