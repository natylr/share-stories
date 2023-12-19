import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoryByTitleApi } from '../../utils/storyApi';
import '../../styles/storyView.css';
import { getUserDataApi } from "../../utils/authApi";

const StoryView = () => {
    const { title } = useParams();
    const [paragraphsData, setParagraphsData] = useState([]); 
    
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
    }, [title]);

    return (
        <div className="story-view-container">
            <h1 className="story-view-title">{title}</h1>
            {paragraphsData.map((paragraphData, index) => (
                <div className="story-view-paragraph-frame" key={index}>
                    <div dangerouslySetInnerHTML={{ __html: paragraphData.textData }} />
                    {console.log(paragraphData.paragraphImageData)}
                    {paragraphData.paragraphImageData && (
                        <img src={`http://localhost:5000/${paragraphData.paragraphImageData}`} alt={`Image ${index}`} className='add-story-img' />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StoryView;