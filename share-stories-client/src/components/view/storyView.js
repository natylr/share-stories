import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoryByTitleApi } from '../../utils/storyApi';
import '../../styles/storyView.css';
import { getUserDataApi } from "../../utils/authApi";
import { BASE_URL } from '../../config/config';

const StoryView = () => {
    const { title } = useParams();
    const [paragraphsData, setParagraphsData] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchStoryByTitle = async () => {
            try {
                const userData = await getUserDataApi(localStorage.getItem("token"));
                const userId = userData.data.userId;
                const storyData = await getStoryByTitleApi(userId, title);

                if (isMounted) {
                    setParagraphsData(storyData.paragraphs);
                }
            } catch (error) {
                console.error('Error fetching story data:', error);
            }
        };

        fetchStoryByTitle();

        return () => {
            isMounted = false;
        };
    }, [title]);

    return (
        <div className="story-view-container">
            <h1 className="story-view-title">{title}</h1>
            {paragraphsData.map((paragraphData, index) => (
                <div className="story-view-paragraph-frame" key={index}>
                    <div className="story-content">
                        <div dangerouslySetInnerHTML={{ __html: paragraphData.textData }} />
                    </div>
                    {paragraphData.paragraphImageData && (
                        <img src={`${BASE_URL}/${paragraphData.paragraphImageData}`} alt={`img${index}`} className='add-story-img' />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StoryView;
