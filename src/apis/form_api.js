
import React, { useState, useEffect } from 'react';

const GetCardDeck = () => {
    const [decks , setDecks] = useState([]) ; 
    
    useEffect(() => {
        fetchDecks();
    }, []) ; 

    const fetchDecks = async () => {
        try {
            const response = await fetch('http://localhost:3006/decks');
            const data = await response.json() ;
            setDecks(data) ;
            } catch (error) {
                console.error('Error fetching tables:', error);

            }
        };
        return decks ; 


}
export default GetCardDeck ; 
