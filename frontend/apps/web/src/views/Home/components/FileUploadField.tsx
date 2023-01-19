import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IconButton, Paper } from "@mui/material";

// eslint-disable-next-line react/display-name
export const FileUploadField = React.memo(({ input, duplicate }: any) => {
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
  // console.log("url::", url);

  return (
    <StyledPaper variant="outlined">
      <div className="dropzone">
        {url && (
          <div className="image-preview">
            <img src={url} />
            <StyledRemove>
              <IconButton className="btn-delete" onClick={handleRemove}>
                <CloseRoundedIcon className="delete-icon" />
              </IconButton>
            </StyledRemove>
          </div>
        )}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : url ? (
            <div className="browse">
              {/* <UploadFileIcon />
              <span>Browse...</span> */}
            </div>
          ) : (
            <div className="dropzone-content">
              <UploadFileIcon width={50} height={50} />
              <p className="drag-text">
                Drag and drop a JPG, PNG, or GIF file.{" "}
              </p>
              <div className="browse">
                <UploadFileIcon />
                <span>Browse...</span>
              </div>
            </div>
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
    padding: 10px;
    max-width: 440px;
    max-height: 250px;
    .MuiDropzoneArea-root {
      min-height: 150px;
      .MuiTypography-root {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
  .image-preview {
    max-width: 100%;
    position: relative;
    img {
      max-width: 450px;
      max-height: 225px;
      width: 100%;
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
    p {
      margin: 0px;
    }
    .drag-text {
      margin-top: 15px;
      font-size: 0.875rem;
    }
    .browse {
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
