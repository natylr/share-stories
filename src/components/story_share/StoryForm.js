import React, { useState } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

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
    <form className="formContainer" onSubmit={handleSubmit}>
      {console.log({ titleFromProps })}
      <h1>{props.title}</h1>
      <label htmlFor="title">{titleFromProps}</label>

      <button className="addButton" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      <div className="paragraphsContainer">
        {paragraphsData.map((paragraphData, index) => (
          <ParagraphFrame key={index} />
        ))}
      </div>

      <button className="saveButton" type="submit">
        Save
      </button>
    </form>
  );
};

export default StoryForm;
