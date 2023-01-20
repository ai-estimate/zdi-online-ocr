import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { MenuEnum, PRICE_LISTS } from "./utils";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Stack } from "@mui/material";

// eslint-disable-next-line react/display-name
const Pricing = React.memo(() => {
  return (
    <Stack px={1} py={2}>
      <TableContainer component={Paper}>
        <Table aria-label="price-table" size="small" stickyHeader>
          <caption>ZDI Onile OCR Plans</caption>
          <TableHead>
            <StyledTableRowFt>
              <TableCell>{MenuEnum.FEATURES}</TableCell>
              <TableCell align="center">{MenuEnum.FREE}</TableCell>
              <TableCell align="center">{MenuEnum.A}</TableCell>
              <TableCell align="center">{MenuEnum.B}</TableCell>
              <TableCell align="center">{MenuEnum.C}</TableCell>
            </StyledTableRowFt>
          </TableHead>
          <TableBody>
            {PRICE_LISTS.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.Features}
                </TableCell>
                <ZDITableCell item={item.Free} />
                <ZDITableCell item={item.A} />
                <ZDITableCell item={item.B} />
                <ZDITableCell item={item.C} />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
});

interface IProps {
  item: any;
}
const ZDITableCell = (props: IProps) => {
  const { item } = props;
  const isYes = item === "Yes" ? item : null;
  const isNo = item === "No" ? item : null;

  return (
    <TableCell align="center">
      {isYes && <CheckCircleRoundedIcon color="success" />}
      {isNo && <CancelRoundedIcon color="error" />}
      {isYes === null && isNo === null && item}
    </TableCell>
  );
};

const StyledTableRowFt = styled(TableRow)`
  && {
    .MuiTableCell-root {
      background-color: #94d2f6 !important;
    }
  }
`;
const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#94d2f6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default Pricing;
