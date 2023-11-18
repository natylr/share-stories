import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import '../../styles/paragraphFrame.css';

const ParagraphFrame = (props) => {
  const [paragraphText, setParagraphText] = useState(EditorState.createEmpty());
  const [paragraphImage, setParagraphImage] = useState(null);

  useEffect(() => {
    if (props.initialText) {
      const contentState = convertFromHTML(props.initialText);
      const editorState = EditorState.createWithContent(contentState);
      setParagraphText(editorState);
    }

    if (props.initialImageUrl) {
      setParagraphImage(props.initialImageUrl);
    }
  }, [props.initialText, props.initialImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setParagraphImage(file)
    onUpdateParagraphData();
  };

  const onEditorStateChange = (newEditorState) => {
    setParagraphText(newEditorState);

    // Automatically save the paragraph data whenever the editor state changes
    onUpdateParagraphData();
  };

  const onUpdateParagraphData = () => {
    const contentState = paragraphText.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    props.onUpdataParagraph( {"textData": { htmlContent }, "paragraphImageData": paragraphImage } );
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
        {paragraphImage && (
          <div>
            <img src={paragraphImage} alt="Uploaded" className='add-story-img' />
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

export default ParagraphFrame;
