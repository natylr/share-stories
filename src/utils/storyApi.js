import  apiService  from './apiService';


export const addStoryApi = async (token, title, mainImage) => {
    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('title', title);
      formData.append('mainImage', mainImage);
  
      const response = await apiService('http://localhost:5000/story/add_story', 'POST', {}, formData);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export const getStoryByTitleApi = async (userId, title) => {
  try {
    const response = await apiService(`http://localhost:5000/story/get_story?userId=${userId}&title=${title}`);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error fetching story data:', error);
    throw error;
  }
};

export const updateParagraphsApi = async (token, title, updatedTextsIndex, updatedTexts, updatedImagesIndex, updatedImages, removedImagesIndex) => {
  try {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('title', title);
    formData.append('updatedTextsIndex', JSON.stringify(updatedTextsIndex));
    formData.append('updatedTexts', JSON.stringify(updatedTexts));
    formData.append('updatedImagesIndex', JSON.stringify(updatedImagesIndex));

    updatedImages.forEach((image) => {
      formData.append('updatedImages', image);
    });

    formData.append('removedImagesIndex', JSON.stringify(removedImagesIndex));

    const response = await apiService('http://localhost:5000/story/update_paragraphs', 'PUT', {}, formData);

    if (!response.ok) {
      throw new Error(`Failed to update paragraphs. Status: ${response.status}`);
    }

    console.log('Paragraphs updated successfully');
  } catch (error) {
    console.error('Error updating paragraphs:', error);
    throw error;
  }
};