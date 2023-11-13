import React, { useState } from 'react';
import ParagraphFrame from './paragraphFrame';
import '../../styles/storyForm.css';

const StoryForm = (props) => {
  const [paragraphsData, setParagraphsData] = useState([]);
  const [titleFromProps, setTitleFromProps] = useState('');

  const handleAddParagraph = () => {
    setParagraphsData([...paragraphsData, {}]);
  };

  const handleParagraphSave = (data, index) => {
    const updatedParagraphs = [...paragraphsData];
    updatedParagraphs[index] = data;
    setParagraphsData(updatedParagraphs);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("storyId", props.storyId);
    formData.append("title", titleFromProps);
    formData.append("paragraphs", JSON.stringify(paragraphsData));

    try {
      const response = await fetch("/api/update_story", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Story updated successfully:", data);
        // Handle success, e.g., redirect to another page
      } else {
        console.error("Error updating story:", data.error);
        // Handle error
      }
    } catch (error) {
      console.error("Error updating story:", error.message);
      // Handle error
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h1>{props.title}</h1>

      <button className="addButton" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      <div className="paragraphsContainer">
        {paragraphsData.map((paragraphData, index) => (
          <ParagraphFrame
            key={index}
            onSave={(data) => handleParagraphSave(data, index)}
          />
        ))}
      </div>

      <button className="saveButton" type="submit">
        Save
      </button>
    </form>
  );
};

export default StoryForm;
