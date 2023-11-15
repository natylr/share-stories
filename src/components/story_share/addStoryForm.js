import React, { useState } from 'react';
import "../../styles/addStoryForm.css"
import ReactPlayer from 'react-player';

const AddStoryForm = ({onFinish}) => {
  // const navigate = useNavigate();
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

    if (!title) {
      alert('Please enter a title.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('token', window.localStorage.getItem("token"))
      formData.append('title', title);
      formData.append('mainImage', mainImage);
      const response = await fetch('http://localhost:5000/story/add_story', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      onFinish(title);
      // navigate('/story', { state: { title } });
      // // Set the uploaded image URL to display
      // setUploadedImageUrl(`http://localhost:5000/${data.mainImageUrl}`);
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
          <ReactPlayer
          width={'100%'}
          height="100%"
          url="http://localhost:3000/create_story_backgroud.mp4"
          playing={true}
          muted={true}
          loop={true}
          config={{
            file: {
              attributes: {
                controlsList: 'nofullscreen',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AddStoryForm;
