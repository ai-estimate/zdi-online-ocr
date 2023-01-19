import {IDataTableColumn, TData} from './types';
import {GridRenderCellParams} from '@mui/x-data-grid';
import moment from 'moment';
import {isEmpty} from 'lodash';

export const renderColumn = (row: TData, column: IDataTableColumn, idx = 0) => {
  const {field, renderCell} = column;
  const value = row[field];
  if (renderCell) {
    return renderCell({
      row: {...row, index: idx},
      value,
    } as GridRenderCellParams);
  }
  if (column.type === 'date') {
    if (isEmpty(value)) return 'N/A';
    return moment(value).format('MMM DD, yyyy');
  }
  return value;
};
