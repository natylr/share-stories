import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

const StoryEditor = (props) => {
  const title = props.title
  const [paragraphsData, setParagraphsData] = useState([]);
  const updatedTextsIndex = new Set();
  const updatedImagesIndex = new Set();

  const fetchStoryByTitle = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:5000/story/get_story?userId=${userId}&title=${title}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch story data. Status: ${response.status}`);
      }

      const responseBody = await response.text();
      const storyData = JSON.parse(responseBody);
      setParagraphsData(storyData.paragraphs);
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

  const updateTextOfParagraph = (paragraphIndex, newText) => {
    const updatedParagraphsData = [...paragraphsData];
    console.log(paragraphIndex, updatedParagraphsData[paragraphIndex])
    updatedParagraphsData[paragraphIndex].textData = newText;
    setParagraphsData(updatedParagraphsData);
    updatedTextsIndex.add(paragraphIndex)
  }

  const updateImageOfParagraph = (paragraphIndex, newImage) => {
    const updatedParagraphsData = [...paragraphsData];
    updatedParagraphsData[paragraphIndex].paragraphImageData = newImage;
    setParagraphsData(updatedParagraphsData);
    updatedImagesIndex.add(paragraphIndex)
  }


  const handleSave = async () => {
    try {
      const updatedImages = [];
      const updatedTexts = [];
      const removedImagesIndex = []
      paragraphsData.forEach((paragraph, index) => {
        if (updatedTextsIndex.has(index)) {
          updatedTexts.push(paragraph.textData);
        }
        if (updatedImagesIndex.has(index)) {
          if (paragraph.paragraphImageData)
            updatedImages.push(paragraph.paragraphImageData);
          else
            removedImagesIndex.push(index)
        }
      })
     
      const formData = new FormData();
      formData.append('token', localStorage.getItem("token"));
      formData.append('title', title);
      formData.append('updatedTexts', updatedTexts);
      formData.append('updatedImages', updatedImages);
      formData.append('removedImagesIndex', removedImagesIndex);

      const response = await fetch(`http://localhost:5000/story/update_paragraphs`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update paragraphs. Status: ${response.status}`);
      }
      const updatedTextsIndex = new Set();
      const updatedImagesIndex = new Set();
      console.log('Paragraphs updated successfully');
    } catch (error) {
      console.error('Error updating paragraphs:', error);
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
          <ParagraphFrame initialText={paragraphData.textData} initialImageUrl={paragraphData.paragraphImageData} index={index} key={index} onUpdataImage={updateImageOfParagraph} onUpdataText={updateTextOfParagraph} />
        ))}
      </div>

      <button className="saveButton" type="button" onClick={handleSave}>
        Save
      </button>
    </form>
  );
};

export default StoryEditor;
