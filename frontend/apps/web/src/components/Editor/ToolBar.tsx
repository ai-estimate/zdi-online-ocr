import {Divider, Stack, ToggleButton, ToggleButtonGroup} from '@mui/material';
import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import useState from 'src/hooks/useState';
import {RichUtils} from 'draft-js';
import H1Icon from 'public/assets/svgs/h1.svg';
import H2Icon from 'public/assets/svgs/h2.svg';

export const ToolBar: React.FC<any> = ({
  onToggle,
  editorState,
  onToggleBlockType,
}) => {
  // return null;
  // var currentStyle = editorState?.getCurrentInlineStyle() || {};

  const tackFormats = TrackTextStyles(editorState);
  const tackBlockType = getCurrentBlockType(editorState);
  const [state, setState] = useState({
    formats: tackFormats || [],
    blockType: tackBlockType || '',
  });

  const {formats, blockType} = state;

  useEffect(() => {
    setState({formats: tackFormats});
    setState({blockType: tackBlockType});
  }, [editorState]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setState({formats: newFormats});
  };
  const handelBlockType = (
    event: React.MouseEvent<HTMLElement>,
    newBlockType: string,
  ) => {
    setState({blockType: newBlockType});
  };

  return (
    <Stack flexDirection={'row'}>
      <ZDIToggleButtonGroup value={formats} onChange={handleFormat}>
        {toolbarItems.map((toolbarItem) => (
          <ToggleButton
            color="primary"
            key={toolbarItem.label}
            value={toolbarItem.style}
            onClick={() => onToggle(toolbarItem.style)}
            aria-label={toolbarItem.label}>
            {toolbarItem.icon || toolbarItem.label}
          </ToggleButton>
        ))}
      </ZDIToggleButtonGroup>
      <ZDIDiver />
      <ZDIToggleButtonGroup value={blockType} onChange={handelBlockType}>
        {toolbarItems2.map((toolbarItem) => (
          <ToggleButton
            color="primary"
            key={toolbarItem.label}
            value={toolbarItem.style}
            onClick={() => onToggleBlockType(toolbarItem.style)}
            aria-label={toolbarItem.label}>
            {toolbarItem.label}
          </ToggleButton>
        ))}
      </ZDIToggleButtonGroup>
    </Stack>
  );
};

const toolbarItems = [
  {label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon />},
  {label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon />},
  {label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon />},
  // {label: 'Code', style: 'CODE'},
  // {label: 'Surprise', style: 'ANYCUSTOMSTYLE'},
];

const toolbarItems2 = [
  {label: 'H1', style: 'header-one', icon: <H1Icon />},
  {label: 'H2', style: 'header-two', icon: <H2Icon />},
];

interface Iprops {
  value: any;
  onChange: any;
  children: any;
}
const ZDIToggleButtonGroup = (props: Iprops) => {
  const {value, onChange, children} = props;

  return (
    <StyledToggleButtonGroup
      size="small"
      value={value}
      onChange={onChange}
      aria-label="toolbar items">
      {children}
    </StyledToggleButtonGroup>
  );
};

export const TrackTextStyles = (editorState: any) => {
  try {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const styles = new Set<string>();

    if (selection.isCollapsed()) {
      editorState
        .getCurrentInlineStyle()
        .forEach((style: any) => style && styles.add(style));
    } else {
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

    const _styles = Array.from(styles);
    return _styles;
  } catch (error) {
    // console.log('error:::', error);
    return [];
  }
};

export const getCurrentBlockType = (editorState: any) => {
  try {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    return currentBlockType;
  } catch (error) {
    // console.log('error TrackTextStyles :::', error);
    return '';
  }
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ZDIDiver = () => {
  return (
    <Divider
      flexItem
      orientation="vertical"
      sx={{
        mx: 0.5,
        my: 1,
        height: 18,
        alignSelf: 'center',
        borderColor: 'gray',
      }}
    />
  );
};
