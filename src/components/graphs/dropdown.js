import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Container } from '@mui/material';

const Dropdown = ({ dataArray, label, onSelectionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        if (onSelectionChange) {
            onSelectionChange(value);
        }
    };

    return (
        <FormControl variant="filled"
                     sx={{
                         '.MuiFilledInput-root': {
                             backgroundColor: 'white', // Change to 'white' if you prefer
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
                    <MenuItem key={index} value={`Option ${item}`}>
                        Option {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
