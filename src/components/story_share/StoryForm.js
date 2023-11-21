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
      // const storyData = await response.json();
      if (response.ok) {
        try {
          const responseBody = await response.text(); 
          const storyData = JSON.parse(responseBody); 
          setParagraphsData(storyData.paragraphs);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
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
  

  const handleUpdateParagraph = (paragraphIndex, newData) => {
    const updatedParagraphsData = [...paragraphsData];
  
    updatedParagraphsData[paragraphIndex] = newData;
  
    setParagraphsData(updatedParagraphsData);
  };

  const handleSave = async () => {
    try {
      const data = {};
      data.title = title;
      data.token = localStorage.getItem("token");
      data.paragraphs = [...paragraphsData];
      console.log(data)
      const response = await fetch('http://localhost:5000/story/update_paragraphs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedStory = await response.json();
      } else {
        console.error('Failed to save story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };
  
  return (
    <form className="formContainer" >
      {/* <h1>{titleFromProps}</h1> */}
      <label htmlFor="title">{title}</label>

      <button className="addButton" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      <div className="paragraphsContainer">
        {paragraphsData.map((paragraphData, index) => (
          <ParagraphFrame initialText={paragraphData.textData} initialImageUrl={paragraphData.paragraphImageData} index={index} key={index} onUpdataParagraph={handleUpdateParagraph}/>
        ))}
      </div>

      <button className="saveButton" type="button" onClick={handleSave}>
        Save
      </button>
    </form>
  );
};

export default StoryForm;
