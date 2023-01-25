import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IconButton, Paper, Stack, Typography } from "@mui/material";

// eslint-disable-next-line react/display-name
export const FileUploadField = React.memo(({ input, isLoading, res }: any) => {
  const onDrop = React.useCallback((files: any) => {
    if (files.length > 0) {
      input.onChange(files[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".pdf"],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    input.onChange(null);
  };

  const { value } = input;
  let url = value?.url;

  if (value && value instanceof File) {
    url = URL.createObjectURL(input.value);
  }
  const item = {
    name: value?.name,
    size: value?.size / 1024 / 1024,
    isPDF: value?.type === "application/pdf",
  };

  return (
    <StyledPaper variant="outlined">
      <div className="dropzone">
        {url && !isLoading && (
          <>
            <div className="image-preview">
              {!item?.isPDF && <img src={url} />}
              {item?.isPDF && <img src={"/assets/svgs/pdf_icon.svg"} />}
              <StyledRemove>
                <IconButton className="btn-delete" onClick={handleRemove}>
                  <CloseRoundedIcon className="delete-icon" />
                </IconButton>
              </StyledRemove>
            </div>
            <Typography variant="h6">{item?.name}</Typography>
            <Typography variant="subtitle1">
              {item?.size.toFixed(2)} MB
            </Typography>
          </>
        )}
        <div className="presentation" {...getRootProps()}>
          <input {...getInputProps()} />
          {isLoading ? (
            <Stack flexDirection={"column"}>
              <img src={"/assets/gif/Loader.gif"} />
              <Typography variant="h6">Uploading . . .</Typography>
            </Stack>
          ) : (
            <>
              {isDragActive ? (
                <div className="dropzone-content">
                  <Typography variant="h6">Drop the files here ...</Typography>
                </div>
              ) : url ? (
                <div className="browse">
                  <UploadFileIcon color="secondary" />
                  <Typography>Browse!...</Typography>
                </div>
              ) : (
                <div className="dropzone-content">
                  <UploadFileIcon color="secondary" />
                  <Typography variant="h6">
                    Drag and drop a JPG, PNG, or PDF file.
                  </Typography>
                  <div className="browse">
                    <UploadFileIcon color="secondary" />
                    <Typography variant="h6">Browse...</Typography>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </StyledPaper>
  );
});
const StyledRemove = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  button {
    color: #fff;
  }
`;
const StyledPaper = styled(Paper)`
  && {
    padding: 0.25rem;
    background-color: #f8f8f8;
    border-radius: var(--border-radius-default);
    min-height: 350px;
    max-height: fit-content;
    border: 3px dashed var(--color-D2D1D6);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .btn-delete {
    background-color: #ecf5fa;
    color: #f00;
    border: 1pt solid #f00;
    border-radius: 0px;
    padding: 2px;
    :hover {
      background-color: #f00;
      color: #fff;
    }
    .delete-icon {
      color: #f00;
    }
    .delete-icon:hover {
      color: #fff;
    }
  }
  .dropzone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .MuiDropzoneArea-root {
      min-height: 150px;
      .MuiTypography-root {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
  .presentation {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-preview {
    max-width: 100%;
    position: relative;
    img {
      max-width: 450px;
      max-height: 225px;
      width: 100%;
      object-fit: contain;
    }
  }
  .dropzone-content {
    text-align: center;
    min-height: 180px;
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
