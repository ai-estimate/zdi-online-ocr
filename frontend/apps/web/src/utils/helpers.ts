import {
  isString,
  isEmpty,
  cloneDeep,
  startsWith,
  map,
  endsWith,
} from "lodash";
import { UserDetailsQuery } from "@z1data/graphql";
import moment from "moment";
import { isEmail } from "./validations";

export const getAvatar = (user: UserDetailsQuery["me"]) => {
  if (!user?.id) return "";
  const { name, firstName, lastName } = user;
  if (firstName && lastName) {
    return `${lastName[0]}${firstName[0]}`;
  }
  const matches = (name || "").match(/\b\w/g);
  return matches?.join("").substring(0, 2).toUpperCase();
};

export const mapDataImage = (medias: any) => {
  return map(medias, (m) => {
    if (isString(m)) {
      return { data: m };
    }
    return {
      data: m?.media?.src || m?.src,
      mimeType: m?.media?.mimeType || m?.mimeType,
    };
  });
};

export const getDateFormat = (value: string) => {
  if (isEmpty(value)) return "N/A";
  return moment(value).format("MMM DD, yyyy");
};

export const getTimeFormat = (value: string) => {
  if (isEmpty(value)) return "";
  return moment(value).format("hh:mm A");
};

export const reverseObjectKey = (obj: any) => {
  const cloneObj = cloneDeep(obj);
  const newObj: any = {};
  Object.keys(cloneObj)
    .reverse()
    .forEach((key: string) => {
      newObj[key] = obj[key];
    });
  return newObj;
};

export const isAbsoluteUrl = (url: string) => {
  return startsWith(url, "http://") || startsWith(url, "https://");
};

export const autoCompleteEmail = (value: string) => {
  if (!value) return value;
  return endsWith(value, "@")
    ? `${value}gmail.com`
    : isEmail(value)
    ? value
    : `${value}@gmail.com`;
};
