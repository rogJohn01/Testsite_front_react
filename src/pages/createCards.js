import React, { useState } from 'react';
import './CreateCard.css';

const CreateCard = () => {
    const [flashcards, setFlashcards] = useState([{ question: '', answer: '' }]);

    const handleQuestionChange = (index, event) => {
        const newFlashcards = flashcards.map((flashcard, i) => {
            if (i === index) {
                return { ...flashcard, question: event.target.value };
            }
            return flashcard;
        });
        setFlashcards(newFlashcards);
    };

    const handleAnswerChange = (index, event) => {
        const newFlashcards = flashcards.map((flashcard, i) => {
            if (i === index) {
                return { ...flashcard, answer: event.target.value };
            }
            return flashcard;
        });
        setFlashcards(newFlashcards);
    };

    const handleAddCard = () => {
        setFlashcards([...flashcards, { question: '', answer: '' }]);
    };

    const handleSave = () => {
        // Implement save functionality here
        console.log('Flashcards to save:', flashcards);
    };

    return (
        <div className="flashcard-app">
            <div className="flashcard-header">
                <h2>Create Flashcards</h2>
            </div>
            {flashcards.map((flashcard, index) => (
                <div key={index} className="flashcard">
                    <div className="flashcard-title">Flashcard {index + 1}</div>
                    <div className="flashcard-body">
                        <input
                            type="text"
                            className="input-field question"
                            placeholder="Who was Muhammad?"
                            value={flashcard.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                        />
                        <input
                            type="text"
                            className="input-field answer"
                            placeholder="Answer"
                            value={flashcard.answer}
                            onChange={(e) => handleAnswerChange(index, e)}
                        />
                    </div>
                </div>
            ))}
            <div className="flashcard-controls">
                <button onClick={handleAddCard}>Add a new card</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};
export default CreateCard;
