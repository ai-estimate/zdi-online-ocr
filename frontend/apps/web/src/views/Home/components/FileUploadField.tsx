import React from "react";
import { useDropzone } from "react-dropzone";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
      "image/*": [".png", ".jpg", ".jpeg", ".bmp"],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    input.onChange(null);
  };

  const { value } = input || "none";
  let url = value?.url;

  if (value && value instanceof File) {
    url = URL.createObjectURL(input.value);
  }

  if (duplicate) {
    return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="dropzone">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : url ? (
              <div className="image-preview">
                <img src={url} />
              </div>
            ) : (
              <div className="dropzone-content">
                <p className="drag-text">
                  Drag and drop a JPG, PNG, or GIF file.{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="header">Upload image profile form</p>
      <div className="dropzone">
        {url && (
          <div className="image-preview">
            <img src={url} />
            <div>
              <IconButton className="btn-delete" onClick={handleRemove}>
                <DeleteIcon className="delete-icon" />
              </IconButton>
            </div>
          </div>
        )}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : url ? (
            <div className="browse">
              {/* <button width={28} height={28} /> */}
              <span>Browse...</span>
            </div>
          ) : (
            <div className="dropzone-content">
              {/* <UploadIcon width={50} height={50} /> */}
              <p className="drag-text">
                Drag and drop a JPG, PNG, or GIF file.{" "}
              </p>
              <div className="browse">
                {/* <BrowseFileIcon width={28} height={28} /> */}
                <span>Browse...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
