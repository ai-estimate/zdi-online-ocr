import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const Home: React.FC = ({ input, duplicate }: any) => {
  const onDrop = React.useCallback((files: any) => {
    if (files.length > 0) {
      input.onChange(files[0]);
    }
  }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: {
  //     "image/*": [".png", ".jpg", ".jpeg", ".bmp"],
  //   },
  //   maxFiles: 1,
  // });
  const { getRootProps, getInputProps, open } = useDropzone({ noClick: true });

  return (
    <Stack flex={1} flexDirection="column" padding={10} {...getRootProps()}>
      <Typography variant="h4" gutterBottom>
        IMAGE TO TEXT CONVERTER - ZDI ONLINE OCR
      </Typography>
      <Typography variant="h6">
        Picture to text converter allows you to extract text from image or
        convert PDF to Word, Excel or Text formats using Optical Character
        Recognition software online
      </Typography>
      <Stack flex={1} flexDirection="row" padding={2}>
        <Stack flex={1} flexDirection="column">
          <Typography variant="h6" p={1}>
            1 STEP - Upload file
          </Typography>
          <input {...getInputProps()} />
          <Button
            fullWidth={false}
            variant="contained"
            size="large"
            sx={{ p: 2 }}
            onClick={open}
          >
            Select file...
          </Button>
          <Typography variant="caption" p={1}>
            Max file size 15 mb.
          </Typography>
        </Stack>
        <Stack flex={2}>
          <Typography variant="h6" flexDirection="column" p={1}>
            2 STEP - Language and output format
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Typography variant="h6" flexDirection="column" p={1}>
            3 STEP - Convert
          </Typography>
          <Button
            fullWidth={false}
            variant="contained"
            size="large"
            sx={{ p: 2 }}
          >
            Conver
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
