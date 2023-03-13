import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import useStates from "components/hooks/useState";
import BlankForm from "views/MyFIle/components/BlankForm";
import axios from "axios";

// eslint-disable-next-line react/display-name
export const FileListField = React.memo(({ input, isLoading, res }: any) => {
  const router = useRouter();
  const [state, setState]: any = useStates({
    initial: {},
    loading: false,
    res: {},
    isSuccess: false,
  });
  const onDrop = React.useCallback((files: any) => {
    if (files.length > 0) {
      input.onChange(files[0]);
    }
    // console.log(files, "files:::");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".text", ".txt"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".doc", ".docx"],
      "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
    },
    maxFiles: 1,
  });
  const { value } = input;
  let url = value?.url;

  if (value && value instanceof File) {
    url = URL.createObjectURL(input.value);
  }

  const handRequest = async (values: any) => {
    const field = values;
    console.log("field:::", field);

    // setState({ loading: true });
    let formData = new FormData();
    formData.append("file", field);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    console.log(formData, "formData:::");

    const baseUrl = "http://api.nextspell.com/khmerocr_api";
    const response = await axios.post(baseUrl, formData, options);
    console.log(response, "response:::");
    // if (response.status === 200) {
    //   setState({ isSuccess: true });
    // }

    // setState({ loading: false, res: response.data, initial: field });
  };
  // console.log("value:::", value?.lastModified);

  useEffect(() => {
    if (value?.lastModified) {
      handRequest(value);
      // console.log(res, "res:::");
    }
  }, [value?.lastModified]);

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/my-file/new");
  };

  return (
    <StyledPaper variant="outlined">
      <Stack
        justifyContent={"center"}
        flexDirection={"column"}
        gap={1}
        py={0}
        alignItems={"center"}
      >
        <StyledNew>
          <Button variant="contained" onClick={handleClick}>
            New
          </Button>
        </StyledNew>
        <div className="dropzone">
          <div className="presentation" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="dropzone-content">
                <Typography variant="h6">Drop the files here ...</Typography>
              </div>
            ) : (
              <div className="dropzone-content">
                <Typography variant="subtitle2">
                  Drag and drop a Text or Doc file.
                </Typography>
                <Typography variant="subtitle2"></Typography>
                <Button size="small" variant="contained">
                  Upload
                </Button>
              </div>
            )}
          </div>
        </div>
      </Stack>
    </StyledPaper>
  );
});

const StyledPaper = styled(Paper)`
  && {
    padding: 0.25rem;
    background-color: #f8f8f8;
    border-radius: var(--border-radius-default);
    max-height: fit-content;
    border: 3px dashed var(--color-D2D1D6);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .dropzone {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .dropzone-content {
      text-align: center;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      p {
        margin: 0px;
      }
      .drag-text {
        margin-top: 15px;
        font-size: 0.875rem;
      }
    }
    .browse {
      padding: 10px 0px;
      display: flex;
      align-items: center;
      margin-top: 28px;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;
      color: #000000;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

const StyledNew = styled(Stack)`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
