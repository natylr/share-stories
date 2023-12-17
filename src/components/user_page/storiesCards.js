import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/storiesCards.css";
import Card from './card';
import { logout } from "../../utils/localStorage";
import apiService from '../../utils/apiService';

const BASE_URL = 'http://localhost:5000';

const StoriesCards = (props) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const { cardsType, onEdit } = props;

  useEffect(() => {
    const fetchData = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        const url = `${BASE_URL}/story/${cardsType}`;
        const method = cardsType === "cards" ? "GET" : "POST";

        try {
          const response = await apiService(url, method, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: cardsType === "cards" ? undefined : JSON.stringify({token}),
          });

          if (response.data === "Invalid Token") {
            logout();
          } else {
            setCards(response);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error, e.g., show a message to the user
        }
      }
    };

    fetchData();
  }, [cardsType]);

  const handleDelete = async (title) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiService(`${BASE_URL}/story/delete_story`, 'DELETE', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, token }),
      });

      if (response.success) {
        setCards(prevCards => prevCards.filter(card => card.title !== title));
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          imageUrl={card.mainImageUrl}
          text={card.title}
          onDelete={cardsType === "cards" ? undefined : () => handleDelete(card.title)}
          isEdit={cardsType === "cards" ? false : true}
        />
      ))}
    </div>
  );
};

export default StoriesCards;