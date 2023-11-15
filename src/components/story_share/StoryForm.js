import React, { useState, useEffect } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

const StoryForm = (props) => {
  const [paragraphsData, setParagraphsData] = useState([]);
  const [titleFromProps, setTitleFromProps] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Set initial data when in edit mode
    if (props.editData) {
      setTitleFromProps(props.editData.title);
      setParagraphsData(props.editData.paragraphs);
      setIsEditMode(true);
    }
  }, [props.editData]);

  const handleAddParagraph = () => {
    setParagraphsData([...paragraphsData, {}]);
  };

  const handleSave = async () => {
    // Handle save functionality
    const formData = {
      title: titleFromProps,
      paragraphs: paragraphsData,
      // Other data you may want to include for saving
    };

    if (isEditMode) {
      // Handle edit mode save
      props.onSaveEdit(formData);
    } else {
      // Handle regular save
      props.onSave(formData);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSave}>
      <h1>{titleFromProps}</h1>
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
