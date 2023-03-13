import React from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { getDateFormat } from "utils/helpers";

export const InputField = React.memo(
  ({
    input,
    label,
    placeholder,
    type,
    meta,
    password,
    onlyread,
    readOnly,
    subtitle,
    isdate,
    removeDot,
    showMessage,
    variant = "outlined",
    onChange,
    ...resp
  }: any) => {
    const hasError = (meta.error || meta.submitError) && meta.touched;
    let helperText = "";
    if (input.type === "password" || showMessage) {
      helperText = (hasError && meta.error) || meta.submitError;
    }
    const dot = subtitle ? "" : ":";
    return (
      <Stack
        direction="row"
        alignItems="center"
        className="text-label-direction"
      >
        <Stack direction="row" alignItems="center" className="text-label">
          {subtitle && (
            <Typography variant="body2" className="sub-title">
              {subtitle} :
            </Typography>
          )}
        </Stack>
        {!readOnly ? (
          <TextField
            {...input}
            {...resp}
            error={hasError}
            size="small"
            readOnly={onlyread}
            id="outlined-basic"
            placeholder={placeholder}
            fullWidth
            label={`${label} ${removeDot ? "" : dot}`}
            value={input.value || ""}
            helperText={helperText}
            InputProps={{
              readOnly: onlyread,
            }}
            autoComplete="new-password"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              input.onChange(e);
              onChange && onChange(e);
            }}
          />
        ) : (
          <Typography variant="body2" className="text-label">
            {isdate ? getDateFormat(input.value) : input.value || ""}
          </Typography>
        )}
      </Stack>
    );
  }
);
