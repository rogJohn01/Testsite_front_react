import React , { createContext, useState} from 'react' ; 



const wordContext = createContext(null) ; 

const WordContextProvider = ({children}) =>{
    const [ ready , setReady ] = useState(false) ; 
    const [contents , setContents] = useState([]) 
    const [deckData , setDeckData] = useState('') ; 
    const [testFinished , setTestFinished] = useState(false) ; 
    const [yesCount , setYesCount ] = useState(1) ; 


    return (
        <wordContext.Provider value={{ready , setReady , contents, setContents , deckData , setDeckData , testFinished , setTestFinished , yesCount ,setYesCount  } }> 
            {children}
        </wordContext.Provider>
    )
}

export {wordContext , WordContextProvider} ; 