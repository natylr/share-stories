import React, { useState, useEffect } from 'react';
import "../../styles/storiesCards.css"
import Card  from './card';

const StoriesCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/story/cards')
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleDelete = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/story/delete_story', {
        method: 'DELETE',
        body: JSON.stringify({ title }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setCards(prevCards => prevCards.filter(card => card.title !== title));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card key={index} imageUrl={card.mainImageUrl} text={card.title} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default StoriesCards;