import React, {useContext, useState} from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {wordContext} from "../../contexts/wordContext";

const Dropdown = ({ dataArray, label, onSelectionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { statisticsDeck , SetStatisticsDeck } = useContext(wordContext)

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        SetStatisticsDeck(value)
        if (onSelectionChange) {
            onSelectionChange(value);
        }
    };

    return (
        <FormControl
            variant="filled"
            sx={{
                width: '300px',  // Add this line to set the width
                '.MuiFilledInput-root': {
                    backgroundColor: 'white',
                },
            }}
        >
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={`${label}-select`}
                value={selectedOption}
                onChange={handleChange}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                }}
            >
                {dataArray.map((item, index) => (
                    <MenuItem key={index} value={item.deck_name}>
                        {item.deck_name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
