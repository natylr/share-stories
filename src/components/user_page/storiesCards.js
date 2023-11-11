import React, { useState, useEffect } from 'react';
import "../../styles/storiesCards.css";
import Card from './card';
import { logout } from "../../utils/localStorage";
import apiService from '../../utils/apiService'; 

const StoriesCards = (props) => {
  const [cards, setCards] = useState([]);
  const { cards_type } = props;

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const url = `http://localhost:5000/story/${cards_type}`;
      const method = cards_type === "cards" ? "GET" : "POST";

      apiService(url, method, {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      }, cards_type === "cards" ? null : { token })
        .then((data) => {
          if (data.data === "Invalid Token") {
            logout();
          } else {
            setCards(data);
          }
        });
    }
  }, [cards_type]);

  const handleDelete = async (title) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await apiService('http://localhost:5000/story/delete_story', 'DELETE', {
        'Content-Type': 'application/json'
      }, { title, token });

      if (response.success) {
        setCards(prevCards => prevCards.filter(card => card.title !== title));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        cards_type === "cards"?
        <Card key={index} imageUrl={card.mainImageUrl} text={card.title} isEdit ={false} />
        :
        <Card key={index} imageUrl={card.mainImageUrl} text={card.title} onDelete={handleDelete} isEdit={true}/>
      ))}
    </div>
  );
};

export default StoriesCards;