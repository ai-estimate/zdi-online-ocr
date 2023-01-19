import {
  MenuEnum,
  isHomeRoute,
  isMyfileRoute,
  isPricingRoute,
  isHelpRoute,
} from "./constants";

export const checkActiveMenu = (url: string) => {
  if (isHomeRoute(url)) {
    return MenuEnum.HOME;
  } else if (isMyfileRoute(url)) {
    return MenuEnum.MY_FILE;
  } else if (isPricingRoute(url)) {
    return MenuEnum.PRICING;
  } else if (isHelpRoute(url)) {
    return MenuEnum.HELP;
  }
};

export enum SortEnum {
  DATE_MODIFIED = "UPDATED_AT",
  TITLE = "NAME",
  DATE_JOINED = "DATE_JOINED",
}
export const ProjectSortField = {
  [SortEnum.DATE_MODIFIED]: {
    key: SortEnum.DATE_MODIFIED,
    value: "Date Modified",
  },
  [SortEnum.TITLE]: { key: SortEnum.TITLE, value: "Title" },
};
export enum SortDirectionEnum {
  LEAST_RECENT = "Least recent",
  MOST_RECENT = "Most recent",
  ALPHABETICAL = "Alphabetical",
  REVERSE_ALPHABETICAL = "Reverse Alphabetical",
}

export enum SortDirectionEnum {
  DESC = "DESC",
  ASC = "ASC",
}
