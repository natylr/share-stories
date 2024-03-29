import React, { useState } from 'react';
import "../../styles/addStoryForm.css"
import { addStoryApi } from '../../utils/storyApi';
import { useNavigate } from "react-router-dom";

const AddStoryForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setUploadedImageUrl(event.target.result);
      }

      reader.readAsDataURL(file);
    } else {
      setUploadedImageUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    try {
      const response = await addStoryApi(window.localStorage.getItem('token'), title, mainImage);
      if (response.status === "ok")
        navigate(`/edit-story/${title}`);
      else
        alert("try again", response)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="outer-frame">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="frame">
            <div className="form-group">
              <label className="story-title-label" htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="story-title-input"
              />
            </div>
          </div>
          <div className="frame">
            <div className="form-group">
              <label className="main-image-label" htmlFor="mainImage">Main Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='main-image-input'
              />
            </div>
          </div>
          <div className="frame">
            <div className="form-group">
              {uploadedImageUrl && (
                <div className="image-preview">
                  <img src={uploadedImageUrl} alt="Uploaded" className='add-story-img' />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className='add-btn'>Add the story</button>
        </form>
      </div>
    </div>
  );
};

export default AddStoryForm;
