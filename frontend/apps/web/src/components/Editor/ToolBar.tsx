import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import React from 'react';

export const ToolBar: React.FC<any> = ({onToggle, editorState}) => {
  var currentStyle = editorState.getCurrentInlineStyle();

  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  return (
    <div>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text toolbar Items">
        {toolbarItems.map((toolbarItem) => (
          <ToggleButton
            key={toolbarItem.label}
            value={toolbarItem.style}
            onClick={() => onToggle(toolbarItem.style)}
            aria-label={toolbarItem.label}>
            {toolbarItem.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

const toolbarItems = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Code', style: 'CODE'},
  {label: 'Surprise', style: 'ANYCUSTOMSTYLE'},
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const textStyles = (editorState: any) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const styles = new Set<string>();
  if (selection.isCollapsed())
    editorState
      .getCurrentInlineStyle()
      .forEach((style) => style && styles.add(style));
  else {
    let key = selection.getStartKey();
    let startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey();
    const endOffset = selection.getEndOffset();
    while (true) {
      const lastRound = key == endKey;
      const block = contentState.getBlockForKey(key);
      const offsetEnd = lastRound ? endOffset : block.getLength();
      const characterList = block.getCharacterList();
      for (
        let offsetIndex = startOffset;
        offsetIndex < offsetEnd;
        offsetIndex++
      )
        characterList
          .get(offsetIndex)
          .getStyle()
          .forEach((style) => style && styles.add(style));
      if (lastRound) break;
      key = contentState.getKeyAfter(key);
      startOffset = 0;
    }
  }

  return styles;
};
