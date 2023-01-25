import React from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import { Form, FormRenderProps, Field } from "react-final-form";
import { FileUploadField } from "components/FileUploadField";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";
import { LoadingButton } from "@mui/lab";
import TextDisplay from "./TextDisplay";

// eslint-disable-next-line react/display-name
const UploadForm = React.memo(() => {
  const [state, setState]: any = useStates({
    initial: {},
    loading: false,
    res: {},
    isSuccess: false,
  });
  const { initial, loading, res, isSuccess } = state;
  const baseUrl = "http://api.nextspell.com/khmerocr_api";

  const onSubmit = async (field: any) => {
    setState({ loading: true });
    let formData = new FormData();
    formData.append("file", field.backgroundImage);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(baseUrl, formData, options);
    if (response.status === 200) {
      setState({ isSuccess: true });
    }
    setState({ loading: false, res: response.data, initial: field });
  };

  const handelAontherOne = () => {
    setState({ isSuccess: false });
  };
  return (
    <Stack justifyContent={"center"} width={"100%"} alignItems={"center"}>
      <Form onSubmit={onSubmit} initialValues={initial}>
        {({ handleSubmit, submitting, pristine }: FormRenderProps) => (
          <StyledForm noValidate onSubmit={handleSubmit}>
            {!isSuccess && (
              <>
                <Stack
                  spacing={2}
                  flex={1}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Field
                    name="backgroundImage"
                    component={FileUploadField}
                    isLoading={loading}
                  />
                </Stack>
                <Stack flex="1" p={1} alignItems={"center"}>
                  {!loading && (
                    <LoadingButton
                      loadingIndicator="Loading…"
                      type="submit"
                      sx={{ width: "260px" }}
                      data-testid="ok-dialog-button"
                      loading={loading}
                      disabled={pristine || submitting}
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                  )}
                  {loading && (
                    <LoadingButton
                      sx={{ width: "260px" }}
                      loading
                      variant="outlined"
                    >
                      Fetch data
                    </LoadingButton>
                  )}
                </Stack>
              </>
            )}
            {isSuccess && (
              <TextDisplay
                res={res}
                initialValues={initial}
                anotherOne={handelAontherOne}
              />
            )}
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
