import React from 'react';
import { render, screen } from '@testing-library/react';
import WordViewTable from './WordViewTable'; // Replace with the actual path to your component

describe('WordViewTable', () => {
    test('it renders the component', () => {
        render(<WordViewTable numRows={10} />);

        // Check if table headers exist
        expect(screen.getByText('Word ID')).toBeInTheDocument();
        expect(screen.getByText('Results')).toBeInTheDocument();
    });

    test('it renders the correct number of rows', () => {
        render(<WordViewTable numRows={5} />);

        const rows = screen.getAllByRole('row');
        // We expect 5 rows of data + 1 header row
        expect(rows.length).toBe(6);
    });

    // Add more test cases as needed
});
