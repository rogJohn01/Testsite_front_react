import React, { useContext, useState, useEffect } from 'react';
import './formDrillTest.scss';
import GetCardDeck from '../../apis/form_api';
import { wordContext } from '../../contexts/wordContext';
import axios from 'axios';

const FormDrill = () => {
  // Debugging the lifecycle
  useEffect(() => {
    console.log("FormDrill Mounted/Updated");
    return () => {
      console.log("FormDrill will Unmount");
    };
  }, []);

  const decks = GetCardDeck(); // You may want to check if this is async

  // Debugging what GetCardDeck is returning
  console.log("Returned decks: ", decks);

  const { ready, setReady } = useContext(wordContext);
  const { contents, setContents } = useContext(wordContext);
  const { deckData , setDeckData} = useContext(wordContext) ;

  // Declare new state variables
  const [selectedDeck, setSelectedDeck] = useState(decks[0]?.deck_name || '');
  const [amount, setAmount] = useState(10);

  const fetchContents = async (deck, amount) => {
    if (deck && amount) {
      try {
        const url = `http://localhost:3006/drill/words/${deck}/${amount}`;
        const response = await axios.get(url);
        const { data } = response;
        setContents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.error("deck or amount is undefined");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReady(true);

    const form = e.currentTarget.closest("form");
    const deck = form.elements.decks.value;
    const amount = form.elements.amount.value;

    // Debugging what is being submitted
    console.log("deck: ", deck);
    console.log("amount: ", amount);

    setDeckData(deck);
    fetchContents(deck, amount);
    console.log('its ready');
  }

  const error = false;
  return (
      <main>
        <section className='quiz quiz-small'>
          <form className='setup-form'>
            <h2>setup Drill</h2>

            <div className='form-control'>
              <label htmlFor="decks">Deck</label>
              <select
                  id="decks"
                  name="decks"
                  className='form-input'
                  value={selectedDeck}
                  onChange={e => setSelectedDeck(e.target.value)}
              >
                {decks.map((deck, index) => (
                    <option key={index} value={deck.deck_name}>
                      {deck.deck_name}
                    </option>
                ))}
              </select>
            </div>

            { /* drill options */ }
            <div className='form-control'>
              <label htmlFor="decks">Drill options </label>
             
            </div>

            {/* amount of cards */}
            <div className='form-control'>
              <label htmlFor='amount'>number of questions</label>
              <input
                  type='number'
                  name='amount'
                  id='amount'
                  className='form-input'
                  min={1}
                  max={50}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
              />
            </div>
            {error && (
                <p className='error'>
                  can't generate questions, please try different options
                </p>
            )}
            <button type='submit' onClick={handleSubmit} className='submit-btn2'>
              start
            </button>
          </form>
        </section>
      </main>
  );
};

export default FormDrill;
