import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import '../../styles/paragraphFrame.css';

const ParagraphFrame = (props) => {
    const userId = localStorage.getItem("userId");
    const [pragraphText, setPragraphText] = useState(EditorState.createEmpty());
    const [mainImage, setMainImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    useEffect(() => {
        // Set initial text state from props
        if (props.initialText) {
            const contentState = convertFromHTML(props.initialText);
            const editorState = EditorState.createWithContent(contentState);
            setPragraphText(editorState);
        }

        // Set initial image state from props
        if (props.initialImageUrl) {
            setUploadedImageUrl(props.initialImageUrl);
        }
    }, [props.initialText, props.initialImageUrl]);

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

    const handleSave = () => {
        const contentState = pragraphText.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);

        // Now you can send the `htmlContent` to your server for saving in MongoDB
        // Example:
        // fetch('/api/saveContent', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ htmlContent })
        // });
    };

    return (
        <div className="paragraph-frame">
            <div className="paragraph-form-group">
                <div className="editor-wrapper">
                    <Editor
                        editorState={pragraphText}
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
            </div>
            <div className="paragraph-form-group">
                {uploadedImageUrl && (
                    <div>
                        <img src={uploadedImageUrl} alt="Uploaded" className='add-story-img' />
                    </div>
                )}
                <input
                    className="paragraph-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <button className="save-paragraph-button" onClick={handleSave}>Save Paragraph</button>
        </div>
    );
};

export default ParagraphFrame;