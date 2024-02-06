
import React, { useState, useEffect } from 'react';

const GetCardDeck = () => {
    const [decks , setDecks] = useState([]) ; 
    
    useEffect(() => {
        fetchDecks();
    }, []) ; 

    const fetchDecks = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}:3006/decks`);
            const data = await response.json() ;
            setDecks(data) ;
            console.log("deckdata: " , data)
            } catch (error) {
                console.error('Error fetching tables:', error);

            }
        };
        return decks ; 


}
export default GetCardDeck ; 
