import {DataGrid, DataGridProps} from '@mui/x-data-grid';
import React from 'react';

type IProps = DataGridProps;

export const XDataGrid: React.FC<IProps> = ({rows, columns, ...props}) => {
  return <DataGrid rows={rows} columns={columns} {...props} />;
};
