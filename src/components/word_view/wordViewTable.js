import React from "react";
import "./wordViewTable.css"; // Import the CSS file

const generateSampleData = (numRows) => {
    const sampleData = [];
    for (let i = 1; i <= numRows; i++) {
        const word_id = Math.floor(Math.random() * 50) + 1;
        const isCorrect = Math.floor(Math.random() * 2);
        const test_form = ["A", "B", "C"][Math.floor(Math.random() * 3)];
        const test_id = Math.floor(Math.random() * 10) + 1;
        const drill_id = Math.floor(Math.random() * 10) + 1;
        const word_date = `2023-${Math.floor(Math.random() * 12) + 1}-${
            Math.floor(Math.random() * 28) + 1
        }`;
        const word_user_id = Math.floor(Math.random() * 5) + 1;
        const word_deck = ["Deck1", "Deck2", "Deck3"][
            Math.floor(Math.random() * 3)
            ];

        sampleData.push({
            word_id,
            isCorrect,
            test_form,
            test_id,
            drill_id,
            word_date,
            word_user_id,
            word_deck,
        });
    }
    return sampleData;
};

const WordViewTable = ({ numRows }) => {
    const data = generateSampleData(numRows);
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.word_id]) {
            acc[item.word_id] = [];
        }
        acc[item.word_id].push(item);
        return acc;
    }, {});

    return (
        <div style={{ margin: "20px" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    marginBottom: "20px",
                }}
            >
                <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Word ID</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Results</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(groupedData).map((wordId) => (
                    <tr key={wordId}>
                        <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                            {wordId}
                        </td>
                        {groupedData[wordId].map((item, index) => (
                            <td
                                key={index}
                                className="tooltip"
                                style={{
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    color: item.isCorrect ? "green" : "red",
                                    fontSize: "24px",
                                    textAlign: "center",
                                }}
                            >
                                •<span className="tooltiptext">{item.word_date}</span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordViewTable;
