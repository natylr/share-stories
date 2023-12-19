import apiService from './apiService';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

export const addStoryApi = async (token, title, mainImage) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('mainImage', mainImage);

    const response = await apiService(`${BASE_URL}/story/add_story`, 
      'POST',
      formData,
      token
    );

    return response;
  } catch (error) {
    console.error('Error adding story:', error);
    throw error;
  }
};

export const getStoryByTitleApi = async (userId, title) => {
  try {
    const response = await apiService(`${BASE_URL}/story/get_story?userId=${userId}&title=${title}`);
    return response;
  } catch (error) {
    console.error('Error fetching story data:', error);
    throw error;
  }
};

export const updateParagraphsApi = async (token, title, updatedTextsIndex, updatedTexts, updatedImagesIndex, updatedImages, removedImagesIndex) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('updatedTextsIndex', updatedTextsIndex);
    formData.append('updatedTexts', updatedTexts);
    formData.append('updatedImagesIndex', updatedImagesIndex);

    updatedImages.forEach((image, index) => {
      formData.append(`updatedImages[${index}]`, image);
    });

    formData.append('removedImagesIndex', removedImagesIndex);

    const response = await apiService(`${BASE_URL}/story/update_paragraphs`, 
      'PUT',
      formData,
      token
    );

    // if (!response.ok) {
    //   throw new Error(`Failed to update paragraphs. Status: ${response.status}`);
    // }

    console.log('Paragraphs updated successfully');
  } catch (error) {
    console.error('Error updating paragraphs:', error);
    throw error;
  }
};