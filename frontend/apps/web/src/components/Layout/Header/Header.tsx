import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "src/components/Layout/Menu";
import { useRouter } from "next/router";
import { Toolbar, AppBar, Box, Stack } from "@mui/material";

// eslint-disable-next-line react/display-name
const Header: React.FC = React.memo(() => {
  const router = useRouter();

  const backToHome = () => {
    router.push("/home", undefined, { shallow: true });
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ border: 0 }}>
        <Box px={2}>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{ minHeight: 54, alignItems: "center" }}
          >
            <Stack position="relative">
              <StyledLogo
                onClick={backToHome}
                src="/assets/svgs/zdi_ocr.svg"
                alt="Logo"
              />
            </Stack>
            <Box sx={{ ml: 6, flexGrow: 1, display: { xs: "flex" } }}>
              <Stack
                flexGrow={1}
                direction="row"
                justifyContent={"flex-end"}
                sx={{ alignItems: "flex-end", mb: 0 }}
              >
                <Menu />
              </Stack>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <GlobalStyle />
    </>
  );
});

const GlobalStyle: any = createGlobalStyle`
  :root{
    --top-header-height: 48px;
  }
`;
const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`;

export default Header;
