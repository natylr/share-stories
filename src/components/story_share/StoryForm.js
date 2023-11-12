import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';

const StoryForm = (props) => {
  const [paragraphsData, setParagraphsData] = useState([]);
  const [titleFromProps, setTitleFromProps] = useState('');

//   useEffect(() => {
//     // Check if props.location and props.location.state are defined
//     if (props.location && props.location.state && props.location.state.title) {
//       setTitleFromProps(props.location.state.title);
//     }
//   }, [props.location]);

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
      <button type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      {paragraphsData.map((paragraphData, index) => (
        <ParagraphFrame key={index} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default StoryForm;