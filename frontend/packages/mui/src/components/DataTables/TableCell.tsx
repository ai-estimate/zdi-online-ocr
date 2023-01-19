import React from 'react';
import {TableCell as MUITableCell} from '@mui/material';
import {IDataTableColumn} from './types';

interface IProps {
  col: IDataTableColumn;
  children: React.ReactNode;
  onClick?: () => void;
}
export const TableCell: React.FC<IProps> = React.memo((props) => {
  const {col, children, onClick} = props;

  const getAlign = (col: IDataTableColumn) => {
    if (col.type === 'number') return 'center';
    if (col.align) return col.align;
    return 'left';
  };

  const cellSx = (col: IDataTableColumn) => {
    const sx: any = {};
    if (col?.minWidth) sx.minWidth = col.minWidth;
    if (col?.maxWidth) sx.maxWidth = col.maxWidth;
    return sx;
  };

  return (
    <MUITableCell
      width={col?.width}
      key={col.field}
      padding={col.padding || 'normal'}
      sx={cellSx(col)}
      onClick={onClick}
      align={getAlign(col)}>
      {children}
    </MUITableCell>
  );
});
