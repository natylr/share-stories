import React, { useState } from 'react';
import ParagraphFrame from './paragraphFrame';

const StoryForm = (props) => {
  // State for managing the form data
  const [formData, setFormData] = useState({
    // Initialize with default values if needed
    // Example:
    title: '',
    content: '',
  });

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data, for example, send it to an API

    // Reset the form after submission if needed
    setFormData({
      title: '',
      content: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for title */}
      <label htmlFor="title">Title:</label>
        

      {/* Input for content */}
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleInputChange}
      />

      {/* Button to submit the form */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default StoryForm;
