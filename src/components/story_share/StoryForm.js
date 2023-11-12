import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';
import "../../styles/storyForm.css";

const StoryForm = (props) => {
  const [paragraphsData, setParagraphsData] = useState([]);
  const [titleFromProps, setTitleFromProps] = useState('');

  const handleAddParagraph = () => {
    setParagraphsData([...paragraphsData, {}]);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
        {console.log({titleFromProps})}
        <h1>{props.title}</h1>
      <label htmlFor="title">{titleFromProps}</label>
      <button className="story-form-button" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      {paragraphsData.map((paragraphData, index) => (
        <ParagraphFrame key={index} />
      ))}
      <button className="story-form-button" type="submit">Save</button>
    </form>
  );
};

export default StoryForm;