import {Button} from '@mui/material';
import React from 'react';

export const ToolBar: React.FC<any> = ({onToggle, editorState}) => {
  var currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div>
      {toolbarItems.map((toolbarItem) => (
        <Button
          key={toolbarItem.label}
          onClick={() => onToggle(toolbarItem.style)}>
          {toolbarItem.label}
        </Button>
      ))}
    </div>
  );
};

const toolbarItems = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Code', style: 'CODE'},
  {label: 'Surprise', style: 'ANYCUSTOMSTYLE'},
];
