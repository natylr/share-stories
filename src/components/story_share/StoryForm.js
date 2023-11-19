import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

const StoryForm = (props) => {
  const title = props.title 
  const [paragraphsData, setParagraphsData] = useState([]);
  
  const fetchStoryByTitle = async () => { 
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:5000/story/get_story?userId=${userId}&title=${title}`);
      console.log(response)
      // const storyData = await response.json();
      if (response.ok) {
        try {
          const responseBody = await response.text(); // Read the response body as text
          console.log('Response Body:', responseBody);
        
          const storyData = JSON.parse(responseBody); // Attempt to parse the response body as JSON
          console.log('Story Data:', storyData);
          setParagraphsData(storyData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        // console.log(storyData);
        // setParagraphsData(storyData);
        // console.log('Story Data:', storyData);
      } else {
        console.error('Failed to fetch story data');
      }
    } catch (error) {
      console.error('Error fetching story data:', error);
    }
  };

  useEffect(() => {
    fetchStoryByTitle();
  }, []);

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
      formData.append('title', title);
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
      {/* <h1>{titleFromProps}</h1> */}
      <label htmlFor="title">{title}</label>

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
