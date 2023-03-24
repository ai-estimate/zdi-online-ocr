import React from 'react';
import {Box, debounce} from '@mui/material';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {EditorType} from './types';
import {isFunction} from 'lodash';

interface IProps {
  data: string | undefined;
  onChange?(data: string): Promise<void>;
  myRef?: any;
  isEditerUI?: boolean;
  isBgcolor?: boolean;
  readonly?: boolean;
}
export const ZCKEditor: React.FC<IProps> = React.memo(
  ({data, myRef, onChange, isEditerUI, isBgcolor, readonly}) => {
    const saveContent = debounce(async (content) => {
      await onChange?.(content);
    }, 360);

    const handleBoxClick = (e: any) => {
      myRef.current?.editing?.view.focus();
    };

    return (
      <Box
        sx={{minHeight: 'calc(100vh - var(--nav-height) - 80px)'}}
        onClick={handleBoxClick}
        bgcolor={isBgcolor ? '#f9f0e5' : ''}
        id="ctoolbar-editor">
        <CKEditor
          onReady={(editor: EditorType) => {
            if (readonly) {
              editor.enableReadOnlyMode('my-feature-id');
            }
            if (isEditerUI) {
              editor.ui
                .getEditableElement()
                ?.parentElement?.parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement().nextSibling,
                );
            }
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
            if (isFunction(onChange)) {
              const data = editor.getData();
              saveContent(data);
            }
          }}
        />
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return true;
  },
);
