import React from "react";
import axios from "axios";
import { Button, Stack, Typography } from "@mui/material";
import { Form, FormRenderProps, Field } from "react-final-form";
import styled from "styled-components";
import useStates from "src/components/hooks/useState";
import { InputField } from "src/components/Fields";
import { useRouter } from "next/router";
import FieldChangeGroupName from "src/components/Fields/FieldChangeGroupName";
// eslint-disable-next-line react/display-name

interface IProps {
  obj?: any;
}
const BlankForm = React.memo((props: IProps) => {
  const { obj } = props;
  const router = useRouter();

  const { slug } = router?.query;

  const [state, setState]: any = useStates({
    initial: {
      title: slug || "Titile",
      body: "",
    },
    loading: false,
    res: {},
    isSuccess: false,
    data: [],
    title: slug,
    body: null,
  });
  const { initial, loading, res, isSuccess, data, title, body } = state;
  const baseUrl = "http://api.nextspell.com/api_spellcheck";
  const onSubmit = async (field: any) => {
    console.log("field::", field);

    const data = JSON.parse(localStorage.getItem("dataKey") || "[]");
    data.push(field);
    localStorage.setItem("dataKey", JSON.stringify(data));
    let formData = new FormData();

    formData.append("data", field.body);
    const response = await axios.post(baseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setState({
      data: response.data,
      body: `${response.data.message}`,
    });
    console.log("response:::", response.data.message);

    // console.log("response:::", JSON.parse(response.data.message));
    // if (response.status === 200) {
    //   setState({ isSuccess: true });
    // }
    setState({ loading: false, res: response.data, initial: field });
  };

  console.log("body:::", body);

  return (
    <>
      {!isSuccess && (
        <Typography
          variant="subtitle2"
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      )}

      <Form onSubmit={onSubmit} initialValues={initial}>
        {({ handleSubmit, submitting, pristine }: FormRenderProps) => (
          <StyledForm noValidate onSubmit={handleSubmit}>
            {!isSuccess && (
              <>
                <Stack spacing={2} flex={1} width={"100%"}>
                  <Field
                    name="title"
                    value={title}
                    component={FieldChangeGroupName}
                  />
                  <StyledField
                    name="body"
                    value={body}
                    component={"textarea"}
                    rows={30}
                  />
                </Stack>

                <Button
                  sx={{ maxWidth: "180px", mt: 2 }}
                  type="submit"
                  fullWidth
                  variant="z1primary"
                  data-testid="submit-login-button"
                  disabled={submitting}
                >
                  Save
                </Button>
              </>
            )}
          </StyledForm>
        )}
      </Form>
    </>
  );
});

const StyledForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledField = styled(Field)`
  && {
    width: 100%;
    height: 100%;
  }
`;

export default BlankForm;
