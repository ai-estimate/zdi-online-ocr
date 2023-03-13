import React, { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import BlankForm from "./components/BlankForm";
import useStates from "src/components/hooks/useState";

interface IProps {
  onDrop: (acceptedFiles: any) => void;
  accept: any;
  maxFiles: number;
  obj: any;
}
// eslint-disable-next-line react/display-name
const BlankPage = React.memo((props: IProps) => {
  const { onDrop, accept, maxFiles, obj } = props;
  const [state, setState]: any = useStates({
    initial: {},
    loading: false,
    res: {},
    isSuccess: false,
    isUpload: false,
  });
  const { initial, loading, res, isSuccess, isUpload } = state;
  return (
    <Stack
      flex={1}
      flexDirection="column"
      overflow="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flex={1}
        flexDirection="row"
        padding={2}
        width={"100%"}
        justifyContent={"center"}
      >
        <BlankForm />
      </Stack>
    </Stack>
  );
});

export default BlankPage;
