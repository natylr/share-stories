import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import '../../styles/paragraphFrame.css';

const ParagraphFrame = (props) => {
    const [paragraphText, setParagraphText] = useState(EditorState.createEmpty());
    const [mainImage, setMainImage] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setMainImage(file);
      props.onSave({ text: paragraphText, image: file });
    };
  
    const onEditorStateChange = (newEditorState) => {
      setParagraphText(newEditorState);
      props.onSave({ text: newEditorState, image: mainImage });
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
  
  export default ParagraphFrame;
  