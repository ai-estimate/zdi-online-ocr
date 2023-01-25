import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { MenuEnum, MENU_ITEM } from "utils/constants";
import { checkActiveMenu } from "utils/types";
import { useRouter } from "next/router";
import Link from "next/link";

// eslint-disable-next-line react/display-name
const Menu = React.memo(() => {
  const router = useRouter();
  const { pathname } = router;
  const getActiveRoute = () => {
    return checkActiveMenu(pathname);
  };
  const activeRoute = getActiveRoute();

  return (
    <>
      {MENU_ITEM.map((item: any, index: number) => {
        return (
          <Link href={item.url} key={index}>
            <StyledButtonMenu
              component="span"
              data-testid={item.label}
              selected={activeRoute === item.value}
            >
              {item.label}
            </StyledButtonMenu>
          </Link>
        );
      })}
    </>
  );
});

const StyledButtonMenu: any = styled(Button)`
  && {
    font-size: 18px;
    padding: 6px 16px;
    text-transform: inherit;
    border-radius: ${(p: any) => (p.selected ? "4px 4px 0px 0px" : "0px")};
    color: ${(p: any) => (p.selected ? "#006064" : "white")};
    background-color: ${(p: any) => (p.selected ? "white" : "transparent")};
    &:hover {
      text-decoration: underline;
      background-color: ${(p: any) => (p.selected ? "white" : "transparent")};
    }
  }
`;

export default Menu;
