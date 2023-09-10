import React, { createContext, useState } from 'react';

const wordContext = createContext(null);

const WordContextProvider = ({ children }) => {

    // Existing test-specific states
    const [ready, setReady] = useState(false);
    const [contents, setContents] = useState([]);
    const [deckData, setDeckData] = useState('');
    const [testFinished, setTestFinished] = useState(false);
    const [yesCount, setYesCount] = useState(0);
    const [testIndex , setTestIndex] = useState(0) ;



    // New drill-specific states
    const [readyDrill, setReadyDrill] = useState(false);
    const [drillFinished, setDrillFinished] = useState(false);
    const [drillContents, setDrillContents] = useState([]);
    const [drillDeckData, setDrillDeckData] = useState('');
    const [drillYesCount, setDrillYesCount] = useState(0);

    return (
        <wordContext.Provider value={{
            // Existing test-specific states
            ready, setReady,
            contents, setContents,
            deckData, setDeckData,
            testFinished, setTestFinished,
            yesCount, setYesCount,
            testIndex , setTestIndex,
            // New drill-specific states
            readyDrill, setReadyDrill,
            drillFinished, setDrillFinished,
            drillContents, setDrillContents,
            drillDeckData, setDrillDeckData,
            drillYesCount, setDrillYesCount
        }}>
            {children}
        </wordContext.Provider>
    );
}

export { wordContext, WordContextProvider };
