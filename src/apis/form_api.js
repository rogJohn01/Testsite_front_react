
import React, {useState, useEffect, useContext} from 'react';
import {wordContext} from "../contexts/wordContext";
import API from "../services/axiosConfig"


const GetCardDeck = () => {
    const [decks , setDecks] = useState([]) ;
    const { isLoggedIn, setIsLoggedIn } = useContext(wordContext);

    useEffect(() => {
        fetchDecks();
    }, [isLoggedIn]) ;

    const fetchDecks = async () => {
        try {
            const response = await API.get(`/decks`);
            const data = response.data;
            setDecks(data) ;
            console.log("deckdata: " , data)
            } catch (error) {
                console.error('Error fetching tables:', error);

            }
        };
        return decks ; 


}
export default GetCardDeck ; 
GetCardDeck