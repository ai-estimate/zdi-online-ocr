export enum MenuEnum {
  HOME = "home",
  PDF_TO_TEXT = "pdf-to-text",
  MY_FILE = "my-file",
  PRICING = "pricing",
  HELP = "help",
}

export const MENU_ITEM = [
  {
    label: "Home",
    value: MenuEnum.HOME,
    url: "/home",
    newtab: false,
  },
  {
    label: "PDF To Text",
    value: MenuEnum.PDF_TO_TEXT,
    url: "/pdf-to-text",
    newtab: false,
  },
  {
    label: "My Files",
    value: MenuEnum.MY_FILE,
    url: "/my-file",
    newtab: false,
  },
  {
    label: "Pricing",
    value: MenuEnum.PRICING,
    url: "/pricing",
    newtab: false,
  },
  {
    label: "Help",
    value: MenuEnum.HELP,
    url: "/help",
    newtab: false,
  },
];

export const isMyfileRoute = (pathname: string) => {
  return pathname.includes("/my-file");
};
export const isPricingRoute = (pathname: string) => {
  return pathname.includes("/pricing");
};

export const isHelpRoute = (pathname: string) => {
  return pathname.includes("/help");
};
export const isHomeRoute = (pathname: string) => {
  return pathname.includes("/home");
};
export const isPDFToTextRoute = (pathname: string) => {
  return pathname.includes("/pdf-to-text");
};

export const isDashboardRoute = (pathname: string) => {
  const groups: any[] = ["/dashboard", "/dashboard/[slug]"];
  return groups.indexOf(pathname) >= 0;
};
