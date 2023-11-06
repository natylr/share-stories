import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../styles/paragraphFrame.css'

const ParagraphFrame = () => {

    const [pragraphText, setPragraphText] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setUploadedImageUrl(event.target.result);
            }

            reader.readAsDataURL(file);
        } else {
            setUploadedImageUrl(null);
        }
    };

    const onEditorStateChange = (newEditorState) => {
        setPragraphText(newEditorState);
    };

    return (
        <div className="paragraph-frame">
            <div className="paragraph-form-group">
                <label>Paragraph Text:</label>
                <div className="editor-wrapper">
                    <Editor
                        editorState={pragraphText}
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
            </div>
            <div className="paragraph-form-group">
                <label htmlFor="mainImage">Paragraph Image:</label>
                <input
                    className="paragraph-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginLeft: 'auto' }} 
                />
            </div>
            {uploadedImageUrl && (
                <div>
                    <img src={uploadedImageUrl} alt="Uploaded" className='add-story-img' />
                </div>
            )}
        </div>
    );
};

export default ParagraphFrame;