import React from 'react';
import { ResponsivePie } from '@nivo/pie';
const PieChart = ({ rawdata }) => {  // Destructure rawdata from props
    console.log("rawdata: ", rawdata);

    // Validate rawdata to be between 0 and 1
    let validData = Math.min(1, Math.max(0, rawdata));

    const data = [
        {
            id: "covered",
            label: "covered",
            value: validData,
        },
        {
            id: "uncovered",
            label: "uncovered",
            value: parseFloat((1 - validData).toFixed(2)),
        },
    ];

    return (
        <div style={{ height: '300px' }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
                enableRadialLabels={false}
                enableSliceLabels={true}
                sliceLabel={d => `${d.value * 100}%`}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
};



export default PieChart;
