import React from "react";
import { styled as MuiStyled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, IconButton } from "@mui/material";

export const BootstrapDialog = MuiStyled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: 16,
  },
  "& .MuiDialogActions-root": {
    padding: 8,
  },
}));

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}
export const BootstrapDialogTitle = (props: IProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 2, py: 1, fontSize: 18 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
