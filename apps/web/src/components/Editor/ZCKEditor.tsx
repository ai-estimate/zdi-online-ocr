import React from 'react';
import {Box, debounce} from '@mui/material';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {EditorType} from './types';

let isDirty = false;
interface IProps {
  data: string | undefined;
  onChange(data: string): Promise<void>;
  myRef?: any;
}
export const ZCKEditor: React.FC<IProps> = React.memo(
  ({data, myRef, onChange}) => {
    const saveContent = debounce(async (content) => {
      if (!isDirty) return;
      await onChange(content);
      isDirty = false;
    }, 360);

    const handleBoxClick = (e: any) => {
      myRef.current?.editing?.view.focus();
    };

    return (
      <Box
        sx={{minHeight: 'calc(100vh - var(--nav-height) - 80px)'}}
        onClick={handleBoxClick}
        id="ctoolbar-editor">
        <CKEditor
          onReady={(editor: EditorType) => {
            editor.ui
              .getEditableElement()
              ?.parentElement?.parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement().nextSibling,
              );
            myRef.current = editor;
          }}
          config={{
            placeholder: 'Type or paste (⌘+V) your text here or',
            toolbar: [
              'bold',
              'italic',
              'underline',
              '|',
              'heading',
              'numberedList',
              'bulletedList',
              'removeFormat',
            ],
          }}
          editor={DecoupledEditor}
          data={data}
          onChange={(event: any, editor: EditorType) => {
            const data = editor.getData();
            isDirty = true;
            saveContent(data);
          }}
        />
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return true;
  },
);
