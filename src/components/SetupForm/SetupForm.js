import React, {useContext, useEffect, useState} from 'react';
import './setUpForm.scss';
import GetCardDeck from '../../apis/form_api';
import { wordContext } from '../../contexts/wordContext';
import API from '../../services/axiosConfig';

const SetupForm = () => {
  const decks = GetCardDeck();
  const { ready, setReady } = useContext(wordContext);
  const { contents, setContents } = useContext(wordContext);
  const { deckData , setDeckData} = useContext(wordContext) ;

  // Declare new state variables

  const [selectedDeck, setSelectedDeck] = useState(decks[0] || '');
  const [amount, setAmount] = useState(10);








  const fetchContents = async (deck, amount) => {
    try {
      // Assuming `API` is your Axios instance
      const url = `/words/${deck}/${amount}`; // Adjusted URL to be relative, assuming base URL is set in the Axios instance

      const response = await API.get(url);
      const data = response.data; // Extracting data from the response
      setContents(data); // Assuming `setContents` updates your state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setReady(true);
    
    const form = e.currentTarget.closest("form");
    const deck = form.elements.decks.value;
    const amount = form.elements.amount.value;
    console.log("deck: " ,deck)
    console.log("amount: " , amount )
    
    setDeckData(deck) ; 

    fetchContents(deck,amount); // Fetch contents when form is submitted



    console.log('its ready');
  }

  const error = false;
  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>setup quiz</h2>

          <div className='form-control'>
            <label htmlFor="decks">Decks</label>
            <select
              id="decks"
              name="decks"
              className='form-input'
              value={selectedDeck} // Bind select to state variable
              onChange={e => setSelectedDeck(e.target.value)} // Update state when selection changes
            >
              {decks.map((deck, index) => (
                <option key={index} value={deck.deck_name}>
                  {deck.deck_name}
                </option>
              ))}
            </select>
          </div>

          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              type='number'
              name='amount'
              id='amount'
              className='form-input'
              min={1}
              max={50}
              value={amount} // Bind input to state variable
              onChange={e => setAmount(e.target.value)} // Update state when input changes
            />
          </div>
  
          {error && (
            <p className='error'>
              can't generate questions, please try different options
            </p>
          )}
          <button type='submit' onClick={handleSubmit} className='submit-btn'>
            start
          </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm;
