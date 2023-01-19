export enum MenuEnum {
  HOME = "home",
  MY_FILE = "myfile",
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
    label: "My Files",
    value: MenuEnum.MY_FILE,
    url: "/myfile",
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
  return pathname.includes("/myfile");
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

export const isDashboardRoute = (pathname: string) => {
  const groups: any[] = ["/dashboard", "/dashboard/[slug]"];
  return groups.indexOf(pathname) >= 0;
};
