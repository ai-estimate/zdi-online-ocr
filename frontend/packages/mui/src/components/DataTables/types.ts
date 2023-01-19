import {SxProps, Theme} from '@mui/material/styles';
import {GridColDef} from '@mui/x-data-grid';

export type TData = Record<string, any>;

export interface IDataTableColumn
  extends Omit<GridColDef, 'editable' | 'groupable' | 'width'> {
  width?: number | string;
  padding?: 'checkbox' | 'none' | 'normal';
  onClick?: (id: string) => void;
  orderBy?: string;
}

export interface IInfiniteScroll {
  onFetchMore(): Promise<any>;
  hasMore: boolean;
  loading: boolean;
  networkStatus?: number;
}

export interface IDataTableProps {
  columns: IDataTableColumn[];
  rows: TData[];
  containerSx?: SxProps<Theme>;
  tableSx?: SxProps<Theme>;
  renderActions?: (row: TData) => React.ReactNode;
  infiniteScroll?: IInfiniteScroll;
  stickyHeader?: boolean;
  renderEmpty?: () => React.ReactNode;
}
