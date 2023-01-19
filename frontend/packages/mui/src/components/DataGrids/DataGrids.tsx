import React from 'react';
import {DataEditor, GridCell, GridCellKind} from '@glideapps/glide-data-grid';
import {Resizable, Size as ResizableSize} from 're-resizable';
import styled from 'styled-components';
import {IDataGridProps} from './types';

import '@glideapps/glide-data-grid/dist/index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {Stack} from '@mui/material';

const ROW_HEIGHT = 35;
const MIN_COLUMN_WIDTH = 35;
const MAX_COLUMN_WIDTH = 650;
// Min width for the resizable table container:
// Based on one column at minimum width + 2 for borders + 1 to prevent overlap problem with selection ring.
const MIN_TABLE_WIDTH = MIN_COLUMN_WIDTH + 3;
// Min height for the resizable table container:
// Based on header + one column, and + 2 for borders + 1 to prevent overlap problem with selection ring.
const MIN_TABLE_HEIGHT = 2 * ROW_HEIGHT + 3;
const DEFAULT_TABLE_HEIGHT = 400;

export const DataGrids: React.FC<IDataGridProps> = React.memo((props) => {
  const {columns, data = []} = props;

  const [resizableSize, setResizableSize] = React.useState<ResizableSize>({
    width: '100%',
    height: '100%',
  });
  const resizableRef = React.useRef<Resizable>(null);

  const getContent = React.useCallback(
    (cell: any): GridCell => {
      const [col, row] = cell;
      const dataRow = data[row];
      // dumb but simple way to do this
      const indexes: any[] = ['id', 'name', 'type'];
      const d = dataRow[indexes[col]];

      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: d,
        data: d,
      };
    },
    [data],
  );
  const maxHeight = 450;
  const numRows = data.length;
  //   console.log('data:: ', data);
  return (
    <StyledResizableContainer className="stDataFrame">
      <Resizable
        ref={resizableRef}
        style={{border: `1px solid #EBEDF0`}}
        minHeight={MIN_TABLE_HEIGHT}
        maxHeight={maxHeight}
        minWidth={MIN_TABLE_WIDTH}
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        grid={[1, ROW_HEIGHT]}
        snapGap={ROW_HEIGHT / 3}
        defaultSize={resizableSize}
        size={resizableSize}
        onResizeStop={(_event, _direction, _ref, _delta) => {
          if (resizableRef.current) {
            setResizableSize({
              width: resizableRef.current.size.width,
              height:
                // Add an additional pixel if it is stretched to full width
                // to allow the full cell border to be visible
                maxHeight - resizableRef.current.size.height === 3
                  ? resizableRef.current.size.height + 3
                  : resizableRef.current.size.height,
            });
          }
        }}>
        <DataEditor
          getCellContent={getContent}
          columns={columns}
          rows={numRows}
          minColumnWidth={MIN_COLUMN_WIDTH}
          maxColumnWidth={MAX_COLUMN_WIDTH}
          rowHeight={ROW_HEIGHT}
          headerHeight={ROW_HEIGHT}
          smoothScrollX={true}
          // Only deactivate smooth mode for vertical scrolling for large tables:
          smoothScrollY={numRows < 100000}
          // Show borders between cells:
          verticalBorder={true}
          // Activate copy to clipboard functionality:
          getCellsForSelection={true}
          // Deactivate row markers and numbers:
          rowMarkers={'none'}
          // Deactivate selections:
          rangeSelect={'rect'}
          columnSelect={'none'}
          rowSelect={'none'}
          experimental={{
            // We use an overlay scrollbar, so no need to have space for reserved for the scrollbar:
            scrollbarWidthOverride: 1,
          }}
        />
      </Resizable>
    </StyledResizableContainer>
  );
});

const StyledResizableContainer = styled(Stack)`
  && {
    position: relative;
    display: inline-block;

    & .glideDataEditor {
      height: 100%;
      min-width: 100%;
    }
    & .dvn-scroller {
      scrollbar-width: thin;
      overflow-x: overlay !important;
      overflow-y: overlay !important;
    }
  }
`;
