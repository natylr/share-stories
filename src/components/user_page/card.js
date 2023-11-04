import React from 'react';
import "../../styles/storiesCards.css"

const Card = ({ imageUrl, text, onDelete }) =>{ 
    const title = text
    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(text);
    };
    
    return(
    <div className="card">
      <div className="card-image">
        <img src={`http://localhost:5000/${imageUrl}`} alt="Card" />
        <h1 className="card-text">{text}</h1>
      </div>
      <button className="edit-button">edit</button>
      <button className="delete-button"  onClick={handleDelete}>delete</button>
    </div>
  )
};

export default Card;