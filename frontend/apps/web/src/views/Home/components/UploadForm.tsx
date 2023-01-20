import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import { Form, FormRenderProps, Field } from "react-final-form";
import { FileUploadField } from "components/FileUploadField";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";
import { Button } from "@mui/material";

// eslint-disable-next-line react/display-name
const UploadForm = React.memo(() => {
  const [state, setState]: any = useStates({
    initial: {},
  });
  const { initial } = state;

  const onSubmit = async (field: any) => {
    console.log("field::", field);
  };

  return (
    <Stack justifyContent={"center"} width={"100%"} alignItems={"center"}>
      <Form onSubmit={onSubmit} initialValues={initial}>
        {({ handleSubmit, submitting }: FormRenderProps) => (
          <StyledForm noValidate onSubmit={handleSubmit}>
            <Stack
              spacing={2}
              flex={1}
              justifyContent="center"
              alignItems={"center"}
            >
              <Field
                name="backgroundImage"
                component={FileUploadField}
                duplicate
              />
            </Stack>
            <Stack flex="1" p={1} alignItems={"center"}>
              <Button
                className="save-map"
                type="submit"
                sx={{ width: "260px" }}
                data-testid="ok-dialog-button"
                // loading={submitting}
                disabled={submitting}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </StyledForm>
        )}
      </Form>
    </Stack>
  );
});

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export default UploadForm;
