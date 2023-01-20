import React from "react";
import { Stack } from "@mui/material";
import { Form, FormRenderProps, Field } from "react-final-form";
import { FileUploadField } from "components/FileUploadField";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";
import { LoadingButton } from "@mui/lab";

// eslint-disable-next-line react/display-name
const UploadForm = React.memo(() => {
  const [state, setState]: any = useStates({
    initial: {},
  });
  const { initial } = state;

  const onSubmit = async (field: any) => {
    setTimeout(() => {
      console.log("field::", field);
    }, 2000);
  };

  return (
    <Stack justifyContent={"center"} width={"100%"} alignItems={"center"}>
      <Form onSubmit={onSubmit} initialValues={initial}>
        {({ handleSubmit, submitting, pristine }: FormRenderProps) => (
          <StyledForm noValidate onSubmit={handleSubmit}>
            <Stack
              spacing={2}
              flex={1}
              justifyContent="center"
              alignItems={"center"}
            >
              <Field name="backgroundImage" component={FileUploadField} />
            </Stack>
            <Stack flex="1" p={1} alignItems={"center"}>
              <LoadingButton
                className="save-map"
                type="submit"
                sx={{ width: "260px" }}
                data-testid="ok-dialog-button"
                loading={submitting}
                disabled={pristine || submitting}
                variant="contained"
              >
                Submit
              </LoadingButton>
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
