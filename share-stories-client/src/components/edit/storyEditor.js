import React, { useState, useEffect } from 'react';
import EditParagraphFrame from './editParagraphFrame';
import '../../styles/storyEditor.css';
import { getStoryByTitleApi, updateParagraphsApi } from '../../utils/storyApi';
import { useParams } from 'react-router-dom';
import { getUserDataApi } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";

const StoryEditor = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const [paragraphsData, setParagraphsData] = useState([]);
  const [updatedTextsIndex, setUpdatedTextsIndex] = useState(new Set());
  const [updatedImagesIndex, setUpdatedImagesIndex] = useState(new Set());

  const fetchStoryByTitle = async () => {
    try {
      const userData = await getUserDataApi(localStorage.getItem("token"));
      const userId = userData.data.userId;
      const storyData = await getStoryByTitleApi(userId, title);
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
    updatedParagraphsData[paragraphIndex].textData = newText;
    setParagraphsData(updatedParagraphsData);
    setUpdatedTextsIndex(new Set(updatedTextsIndex).add(paragraphIndex));
  };

  const updateImageOfParagraph = (paragraphIndex, newImage) => {
    const updatedParagraphsData = [...paragraphsData];
    updatedParagraphsData[paragraphIndex].paragraphImageData = newImage;
    setParagraphsData(updatedParagraphsData);
    setUpdatedImagesIndex(new Set(updatedImagesIndex).add(paragraphIndex));
  };

  const handleSave = async () => {
    try {
      let updatedImages = [];
      let updatedTexts = [];
      let removedImagesIndex = [];
      paragraphsData.forEach((paragraph, index) => {
        if (updatedTextsIndex.has(index)) {
          updatedTexts.push(paragraph.textData);
        }
        if (updatedImagesIndex.has(index)) {
          if (paragraph.paragraphImageData) updatedImages.push(paragraph.paragraphImageData);
          else removedImagesIndex.push(index);
        }
      });

      await updateParagraphsApi(
        localStorage.getItem('token'),
        title,
        Array.from(updatedTextsIndex),
        updatedTexts,
        Array.from(updatedImagesIndex),
        updatedImages,
        removedImagesIndex
      );

      setUpdatedTextsIndex(new Set());
      setUpdatedImagesIndex(new Set());
    } catch (error) {
      console.error('Error updating paragraphs:', error);
    }
  };

  const handleSaveAndClose =async () => {
    await handleSave();
    navigate("/my-stories");
  }

  return (
    <form className="formContainer">
      <label htmlFor="title">
        <h1>{title}</h1>
      </label>

      <button className="addButton" type="button" onClick={handleAddParagraph}>
        Add Paragraph
      </button>

      <div className="paragraphsContainer">
        {paragraphsData.map((paragraphData, index) => (
          <EditParagraphFrame
            initialText={paragraphData.textData}
            initialImageUrl={paragraphData.paragraphImageData}
            index={index}
            key={index}
            onUpdataImage={updateImageOfParagraph}
            onUpdataText={updateTextOfParagraph}
          />
        ))}
      </div>
      <button className="saveButton" type="button" onClick={handleSave}>
        Save
      </button>
      <button className="closeButton" type="button" onClick={handleSaveAndClose}>
        Save And Close
      </button>
    </form>
  );
};

export default StoryEditor;
