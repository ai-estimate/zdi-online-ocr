import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

export default function FieldChangeGroupName({
  input,
  readOnly,
  ...resp
}: any) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <StyleTextField
        variant="outlined"
        size="small"
        {...input}
        {...resp}
        InputProps={{
          readOnly: readOnly,
        }}
      />
    </Stack>
  );
}

const StyleTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      color: grey;
      font-weight: 600;
      height: 36px;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 4px;
      width: 250px;
    }
    .MuiOutlinedInput-root:hover {
      background-color: rgba(255, 255, 255);
    }
    .Mui-focused {
      border: 2px solid #006064;
      background-color: rgba(255, 255, 255, 0.9);
      &.MuiOutlinedInput-root:hover {
        background-color: rgba(255, 255, 255, 0.9);
        cursor: pointer;
      }
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
    .MuiOutlinedInput-input {
      padding: 0px;
      cursor: pointer;
    }
  }
`;
