import React from "react";
import { Stack } from "@mui/material";
import { Form, FormRenderProps, Field } from "react-final-form";
import { FileListField } from "components/Fields";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";

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
    // console.log(field, "field:::");
    // setState({ loading: true });
    // let formData = new FormData();
    // formData.append("file", field.backgroundImage);
    // const options = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // const response = await axios.post(baseUrl, formData, options);
    // if (response.status === 200) {
    //   setState({ isSuccess: true });
    // }
    // setState({ loading: false, res: response.data, initial: field });
  };

  return (
    <Stack justifyContent={"center"} width={"170px"} alignItems={"center"}>
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
                  <Field name="backgroundImage" component={FileListField} />
                </Stack>
              </>
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
