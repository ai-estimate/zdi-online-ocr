import React, { useEffect } from "react";
import { Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import MyFileForm from "./components/MyFileForm";
import useStates from "src/components/hooks/useState";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// eslint-disable-next-line react/display-name
const MyFile = React.memo(() => {
  const [state, setState]: any = useStates({
    data: null,
  });
  const { data } = state;

  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("dataKey");
    const data = JSON.parse(item);
    const reverseData = data;
    setState({ data: reverseData });
  }, []);
  // console.log(data, "data:::");

  const removeItem = (index: number) => {
    const item = localStorage.getItem("dataKey");
    const data = JSON.parse(item);
    data.splice(index, 1);
    localStorage.setItem("dataKey", JSON.stringify(data));
    setState({ data: data });
  };

  const copyItem = (index: number) => {
    const item = localStorage.getItem("dataKey");
    const data = JSON.parse(item);
    const copyText = data[index]?.body;
    navigator.clipboard.writeText(copyText);
  };

  return (
    <Stack
      flex={1}
      flexDirection="column"
      overflow="auto"
      justifyContent="center"
    >
      <Stack flex={1} flexDirection="row" padding={2} gap={2} flexWrap="wrap">
        <MyFileForm />
        {data?.map((item: any, index: number) => {
          return (
            <Paper variant="outlined" square key={index}>
              <Stack
                flex={1}
                flexDirection="column"
                padding={2}
                width={"170px"}
                height={"180px"}
              >
                <Typography noWrap variant="subtitle2" height={50}>
                  {item?.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  {item?.body}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                flex={1}
                flexDirection="row"
                sx={{ py: 0.5, px: 1 }}
                justifyContent="flex-end"
                gap={1}
              >
                <IconButton
                  onClick={() => copyItem(index)}
                  color="error"
                  size="small"
                >
                  <ContentCopyIcon color="info" />
                </IconButton>
                <IconButton
                  onClick={() => removeItem(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
});

export default MyFile;
