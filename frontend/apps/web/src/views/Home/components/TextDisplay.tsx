import React from "react";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface IProps {
  initialValues: any;
  res: any;
  anotherOne(): void;
}

// eslint-disable-next-line react/display-name
const TextDisplay = React.memo((props: IProps) => {
  const { res, initialValues, anotherOne } = props;
  const [state, setState]: any = useStates({
    toCopy: "Copy To Clipboard",
  });
  const { toCopy } = state;
  const data = res?.message;

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setState({ toCopy: "Copied" });
    setTimeout(() => {
      setState({ toCopy: "Copy To Clipboard" });
    }, 2000);
  };

  const downloadTextFile = () => {
    const fileName = initialValues?.backgroundImage?.name;
    const cleanFileName = fileName?.replace(/\.[^/.]+$/, "");
    const element = document.createElement("a");

    const file = new Blob([data], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${cleanFileName}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <StyledPaper variant="outlined">
      <div className="response-result js-to-copy abc">
        <Typography variant="h6">{data}</Typography>
      </div>
      <Stack justifyContent={"flex-end"} flexDirection={"row"} py={1}>
        <Button variant="contained" onClick={anotherOne}>
          Another One
          <ReplayIcon />
        </Button>
      </Stack>
      <Stack justifyContent={"center"} flexDirection={"row"} gap={1} py={0}>
        <Button variant="contained" onClick={copyToClipboard}>
          {toCopy}
        </Button>
        <Button variant="contained" onClick={downloadTextFile}>
          Download Text File
        </Button>
      </Stack>
    </StyledPaper>
  );
});
const StyledPaper = styled(Paper)`
  && {
    padding: 2rem;
    background-color: #fff;
    width: 100%;
    margin: 1rem auto 0;
    border-radius: var(--border-radius-default);
    position: relative;
    .response-result {
      border: 1px solid #ddd;
      cursor: default;
      padding: 20px;
      width: 100%;
      height: 340px;
      border-radius: 5px;
      background: rgb(248 248 248);
      overflow: auto;
    }
    .abc {
      word-wrap: break-word; /* IE 5.5-7 */
      white-space: pre-wrap; /* Modern browsers */
    }
  }
`;

export default TextDisplay;
