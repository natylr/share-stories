import React from 'react';
import "../../styles/storiesCards.css";

const Card = (props) => { 

    const title = props.text;

    const handleEdit = (e) =>{
        e.preventDefault();
        props.onEdit(title)
    }
    const handleDelete = (e) => {
        e.preventDefault();
        props.onDelete(title);
    };
    
    return (
        <div className="card">
            <div className="card-image">
                {props.imageUrl ? <img src={`http://localhost:5000/${props.imageUrl}`} alt="Card" /> : null}
                <h1 className="card-text">{title}</h1>
            </div>
            {props.isEdit && (
              <>
                <button className="edit-button" onClick={handleEdit}>edit</button>
                <button className="delete-button" onClick={handleDelete}>delete</button>
              </>
              )}
              <button className="view-button">view</button>

        </div>
    );
};

export default Card;