import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

const StoryForm = (props) => {
  const [paragraphsData, setParagraphsData] = useState([]);
  const [titleFromProps, setTitleFromProps] = useState('');

  useEffect(() => {
    // Set initial data when in edit mode
    if (props.editData) {
      setTitleFromProps(props.editData.title);
      setParagraphsData(props.editData.paragraphs);
    }
  }, [props.editData]);

  const handleAddParagraph = () => {
    setParagraphsData([...paragraphsData, {}]);
  };
  
  const handleUpdateParagraph = (paragraphIndex, data) => {
    setParagraphsData((prevData) => {
      const newData = [...prevData];
      newData[paragraphIndex] = data;
      return newData;
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', titleFromProps);
      formData.append('token', localStorage.getItem("token"));
  
      // Append each paragraph data along with its image file (if exists)
      paragraphsData.forEach((paragraph, index) => {
        formData.append(`paragraphs[${index}][text]`, paragraph.text);
        if (paragraph.imageFile) {
          formData.append(`paragraphs[${index}][image]`, paragraph.imageFile);
        }
      });
  
      const response = await fetch('/save_story', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const savedStory = await response.json();
        console.log('Saved Story:', savedStory);
      } else {
        console.error('Failed to save story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };
  
  return (
    <form className="formContainer" onSubmit={handleSave} >
      <h1>{titleFromProps}</h1>
      <label htmlFor="title">{titleFromProps}</label>

      <button className="addButton" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      <div className="paragraphsContainer">
        {paragraphsData.map((paragraphData, index) => (
          <ParagraphFrame key={index} onUpdataParagraph={handleUpdateParagraph}/>
        ))}
      </div>

      <button className="saveButton" type="submit">
        Save
      </button>
    </form>
  );
};

export default StoryForm;
