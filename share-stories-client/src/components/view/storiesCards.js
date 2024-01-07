import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/storiesCards.css";
import Card from './card';
import { getMyStoriesAsCards, getAllStoriesAsCards, deleteStory } from '../../utils/storyApi';


const StoriesCards = (props) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const { cardsType, onEdit } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cardsType === "cards") {
          const response = await getAllStoriesAsCards();
          setCards(response);
        } else {
          const token = window.localStorage.getItem("token");
          const response = await getMyStoriesAsCards(token);
          setCards(response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/all-stories");
      }
    };

    fetchData();
  }, []);


const handleDelete = async (title) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await deleteStory(token, title)

    if (response.success) {
      setCards(prevCards => prevCards.filter(card => card.title !== title));
    }
  } catch (error) {
    console.error('Error deleting story:', error);
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