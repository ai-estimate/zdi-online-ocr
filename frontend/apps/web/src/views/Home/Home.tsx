import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import UploadForm from "./components/UploadForm";

// eslint-disable-next-line react/display-name
const Home = React.memo(() => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".pdf"],
    },
  });
  const files = acceptedFiles;
  console.log(files);

  return (
    <Stack
      flex={1}
      flexDirection="column"
      overflow="auto"
      height={"100%"}
      padding={10}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        IMAGE AND PDF CONVERTER - ZDI ONLINE OCR
      </Typography>
      <Typography variant="h6">
        Picture to text converter allows you to extract text from image or
        convert PDF to Word, Excel or Text formats using Optical Character
        Recognition software online
      </Typography>
      <Stack
        flex={1}
        flexDirection="row"
        padding={2}
        width={"100%"}
        justifyContent={"center"}
      >
        <UploadForm />
      </Stack>
    </Stack>
  );
});

export default Home;
