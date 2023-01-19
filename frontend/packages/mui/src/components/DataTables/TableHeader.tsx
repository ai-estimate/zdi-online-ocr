import React from 'react';
import {TableHead, TableRow, TableSortLabel} from '@mui/material';
import {IDataTableColumn} from './types';
import {TableCell} from './TableCell';
interface IProps {
  columns: IDataTableColumn[];
}

export const TableHeader: React.FC<IProps> = React.memo((props) => {
  const {columns} = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((col: IDataTableColumn) => {
          if (col.sortable) {
            return (
              <TableCell key={col.field} col={col}>
                <TableSortLabel
                  active={col.orderBy === col.field}
                  onClick={() => col.onClick?.(col.field)}>
                  {col.headerName || col.field}
                </TableSortLabel>
              </TableCell>
            );
          }

          return (
            <TableCell col={col} key={col.field}>
              {col.headerName || col.field}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
});

export default TableHeader;
