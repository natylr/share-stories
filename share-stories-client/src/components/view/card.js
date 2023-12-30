import React from 'react';
import "../../styles/storiesCards.css";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../config/config'

const Card = (props) => { 
    const navigate = useNavigate();
    const title = props.text;

    const handleEdit = (e) =>{
        e.preventDefault();
        navigate("/edit-story/"+ title)
    }
    const handleDelete = (e) => {
        e.preventDefault();
        props.onDelete(title);
    };
    
    const handleView = (e)=> {
        e.preventDefault();
        navigate("/view-story/"+ title)
    };
    return (
        <div className="card">
            <div className="card-image">
                {props.imageUrl ? <img src={`${BASE_URL}/${props.imageUrl}`} alt="Card" /> : null}
                <h1 className="card-text">{title}</h1>
            </div>
            {props.isEdit && (
              <>
                <button className="edit-button" onClick={handleEdit}>edit</button>
                <button className="delete-button" onClick={handleDelete}>delete</button>
              </>
              )}
              <button className="view-button" onClick={handleView}>view</button>

        </div>
    );
};

export default Card;