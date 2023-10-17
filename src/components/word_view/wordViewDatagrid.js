import React, {useContext, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


import "./wordViewTable.css";
import {wordContext} from "../../contexts/wordContext";
import GetCardDeck from "../../apis/form_api";

const WordViewTable2 = ({ data }) => {
    console.log("Received data:", data);  // Debugging log


    const [open, setOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState('md');
    const [selectedDeck, setSelectedDeck] = useState("");

    //const { deckData , setDeckData} = useContext(wordContext) ;
    const decks = GetCardDeck();

    //console.log(typeof deckData, deckData);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };

    const handleDeckChange = (event) => {
        setSelectedDeck(event.target.value);
    };



    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.word_id]) {
            acc[item.word_id] = {
                word_front: item.word_front,
                word_deck: item.word_deck,  // Add the word_deck here

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
        word_deck: groupedData[wordId].word_deck,  // Add the word_deck here too
    }));


    const filteredRows = selectedDeck ? rows.filter(row => row.word_deck === selectedDeck) : rows;


    console.log("Generated rows:", rows);  // Debugging log

    const maxDots = Math.max(...Object.values(groupedData).map(arr => arr.data.length));

    const columns = [
        { field: 'word_front', headerName: 'Word', width: 150 }, // New column for word_front
        { field: 'word_id', headerName: 'Word ID', width: 150 },
        ...Array.from({ length: maxDots }, (_, i) => ({
            field: `dot${i + 1}`,
            headerName: `Dot ${i + 1}`,
            width: 100,
            renderCell: (params) => {
                // Retrieve the word_id for this row
                const wordId = params.row.word_id;

                // Retrieve the color for the current dot using the word_id
                const colorInfo = groupedData[wordId]?.data[i]?.color || 'white';

                // Retrieve the date for the tooltip
                const dateInfo = groupedData[wordId]?.data[i]?.date || '';

                return (
                    <Tooltip title={dateInfo} arrow>
                        <div style={{ color: colorInfo, fontSize: '50px' }}>
                            •
                        </div>
                    </Tooltip>

            )},
        })),
    ];

    console.log("Generated columns:", columns);  // Debugging log
    return (

        <div>
            <DataGrid rows={filteredRows} columns={columns} pageSize={5} checkboxSelection />
            <Fab
                color="primary"
                aria-label="add"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px'
                }}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
                <DialogTitle>Select an Option</DialogTitle>
                <DialogContent>
                    <div>
                        <Typography variant="h6">Choose Deck for Filtering</Typography>
                    </div>
                    <div>
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="selected-deck">Decks</InputLabel>
                            <Select
                                autoFocus
                                value={selectedDeck}
                                onChange={handleDeckChange}
                                label="Decks"
                                inputProps={{
                                    name: 'selected-deck',
                                    id: 'selected-deck',
                                }}
                            >
                                {decks.map((deckObj, index) => (
                                    <MenuItem key={index} value={deckObj.deck_name}>
                                        {deckObj.deck_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WordViewTable2;