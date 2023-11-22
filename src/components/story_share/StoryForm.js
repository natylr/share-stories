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
    console.log(updatedParagraphsData[paragraphIndex])
    setParagraphsData(updatedParagraphsData);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('token', localStorage.getItem("token"));
  
      paragraphsData.forEach((paragraph, index) => {
        formData.append(`paragraphs[${index}][textData]`, paragraph.textData);
        formData.append(`paragraphs[${index}][paragraphImageData]`, paragraph.paragraphImageData);
      });
      console.log(formData)
      const response = await fetch('http://localhost:5000/story/update_paragraphs', {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        const savedStory = await response.json();
        alert("Your changes have been saved");
      } else {
        console.error('Failed to save story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };
  return (
    <form className="formContainer" >
      <label htmlFor="title"><h1>{title}</h1></label>

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
