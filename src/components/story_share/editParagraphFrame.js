import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import '../../styles/paragraphFrame.css';

const EditParagraphFrame = (props) => {
    const [paragraphText, setParagraphText] = useState(EditorState.createEmpty());
    const [paragraphImage, setParagraphImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    useEffect(() => {
        if (props.initialText) {
            const blocksFromHTML = convertFromHTML(props.initialText);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            const editorState = EditorState.createWithContent(contentState);
            setParagraphText(editorState);
        }
        if (props.initialImageUrl) {
            setUploadedImageUrl(`http://localhost:5000/${props.initialImageUrl}`);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file === paragraphImage) {
            return
        }
        props.onUpdataImage(props.index, file);
        setParagraphImage(file);
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
        if (paragraphText == newEditorState) {
            return
        }
        const contentState = newEditorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        props.onUpdataText(props.index, htmlContent);
        setParagraphText(newEditorState)
    };

    return (
        <div className="paragraph-frame">
            <div className="paragraph-form-group">
                <div className="editor-wrapper">
                    <Editor
                        editorState={paragraphText}
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
        </div>
    );
};

export default EditParagraphFrame;
