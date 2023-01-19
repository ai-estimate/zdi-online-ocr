import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import {
  IDataTableProps,
  IDataTableColumn,
  TData,
  IInfiniteScroll,
} from './types';
import {TableHeader} from './TableHeader';
import {renderColumn} from './utils';
import {isEmpty, isFunction} from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Loader, LoadingOverlay} from '../Loader';
import {TableCell} from './TableCell';

export const DataTables: React.FC<IDataTableProps> = React.memo((props) => {
  const {
    containerSx,
    tableSx,
    columns,
    rows,
    stickyHeader,
    infiniteScroll,
    renderActions,
    renderEmpty,
  } = props;

  return (
    <TableContainer
      id="infinite-scroll"
      sx={{bgcolor: 'white', ...containerSx}}>
      <Table stickyHeader={stickyHeader} aria-label="sticky table" sx={tableSx}>
        <TableHeader columns={columns} />
        <TableBody>
          {rows?.length > 0 &&
            rows?.map((row: TData, index: number) => {
              return (
                <StyledTableRow key={index}>
                  {columns?.map((col: IDataTableColumn, idx: number) => {
                    if (col.type === 'actions' && isFunction(renderActions)) {
                      return (
                        <TableCell
                          col={col}
                          onClick={() => col.onClick?.(row.id)}
                          key={idx}>
                          {renderActions(row)}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={idx}
                        col={col}
                        onClick={() => col.onClick?.(row.id)}>
                        {col.renderCell ? (
                          renderColumn(row, col, index)
                        ) : (
                          <Typography
                            className={col.onClick ? 'body-text' : ''}>
                            {renderColumn(row, col)}
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      {!isEmpty(infiniteScroll) && (
        <RenderInfiniteScroll rows={rows} {...infiniteScroll} />
      )}
      {isEmpty(rows) && !infiniteScroll?.loading && renderEmpty?.()}
    </TableContainer>
  );
});

const RenderInfiniteScroll: React.FC<IInfiniteScroll & {rows: TData}> =
  React.memo((props) => {
    const {rows, onFetchMore, hasMore, loading, networkStatus} = props;

    return (
      <>
        <InfiniteScroll
          scrollableTarget="infinite-scroll"
          dataLength={(rows?.length ?? 0) || 0}
          next={onFetchMore}
          hasMore={hasMore}
          loader={loading && <Loader />}>
          <div></div>
        </InfiniteScroll>
        {networkStatus === 1 && <LoadingOverlay loading={loading} />}
      </>
    );
  });

const StyledTableRow = styled(TableRow)`
  && {
    background-color: ${(p: any) => (p.selected ? '#EAECF0' : '#fff')};
    &:hover {
      background: #eaecf0;
      & .body-text {
        color: #2a7de1;
        cursor: pointer;
      }
    }
  }
`;
