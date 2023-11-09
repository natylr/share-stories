import React, { useState, useEffect } from 'react';
import "../../styles/storiesCards.css"
import Card from './card';
import {logout} from "../../utils/localStorage"

const StoriesCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/story/my_cards", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data === "Invalid Token") {
            logout();
          }
          else {
            setCards(data)
          }
        });
    }
  }, []);

  const handleDelete = async (title) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await fetch('http://localhost:5000/story/delete_story', {
        method: 'DELETE',
        body: JSON.stringify({ title , token}),
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