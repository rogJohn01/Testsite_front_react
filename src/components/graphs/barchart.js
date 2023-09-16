import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const Barchart = ({ data }) => (

    <ResponsiveBar
        data={data}
        keys={['score']}
        indexBy="test_date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Test',
            legendPosition: 'middle',
            legendOffset: 32,
        }}
        axisLeft={{
            tickValues: [0, 20, 40, 60, 80, 100], // Explicitly set tick values

            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Score',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        gridYValues={[0, 20, 40, 60, 80, 100]} // Explicitly set horizontal grid lines

        yScale={{ type: 'linear', min: 0, max: 100 }} // Here is where you set the y-axis max value
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
);

export default  Barchart
