import { forEach } from "lodash";
import { FORM_ERROR } from "final-form";
import { formatMessage, commonMessages } from "intl";
// import {ErrorUtils} from '@z1data/graphql';

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isNumber = (value: number) => {
  return !isNaN(value);
};

// export const mapResponseErrors = (
//   errors: any[],
//   key = '',
//   prevWord = '',
//   newWord = '',
// ) => {
//   const _errors: any = {};
//   forEach(errors, ({message, field}) => {
//     if (field === 'error') {
//       _errors[FORM_ERROR] = message;
//     } else {
//       if (key && key === field) {
//         _errors[field] = message.replace(prevWord, newWord);
//       } else {
//         _errors[field] = message;
//       }
//     }
//   });
//   return _errors;
// };

// export const notifySubmitError = (err: any, notify: any) => {
//   const message = ErrorUtils.getPermissionDenied(err);

//   notify({
//     title: message ? 'PermissionDenied' : 'Error',
//     text:
//       message ||
//       err?.message ||
//       formatMessage(commonMessages.somethingWentWrong),
//     status: 'error',
//   });
// };

// export const notifySubmitErrorField = (err: any, notify: any) => {
//   const message = ErrorUtils.getErrorMessage(err);
//   notify({
//     title: 'Error',
//     text: message || formatMessage(commonMessages.somethingWentWrong),
//     status: 'error',
//   });
// };
export const checkStrengthPassword = (value: string) => {
  const strongPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{16,}))"
  );
  const mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))"
  );
  if (strongPassword.test(value)) {
    return "Strong";
  } else if (mediumPassword.test(value)) {
    return "Medium";
  } else {
    if (value.length) {
      return "Weak";
    } else {
      return "None";
    }
  }
};

export const validateRequired = (value: any) =>
  value ? "" : "This field is required";

//validate required fields custom message
export const validateCRequired =
  (message = "This field is required") =>
  (value: any) =>
    value ? undefined : message || "This field is required";

export const validateMustBeNumber = (value: any) =>
  isNaN(value) ? "Must be a number" : undefined;

export const validateMinValue = (min: number) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const validateMaxLength = (max: number) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const validateEmail = (value: any) =>
  value && !isEmail(value) ? "Email address is invalid" : undefined;

export const validatePassword = (value: any) =>
  value && value.length < 8
    ? "Password must be at least 8 character"
    : undefined;

export const validatePasswordV2 = (value: any) => {
  const upperCase = value === "" ? false : getUpperCase(value);
  if (value && value.length >= 8 && upperCase) {
    return undefined;
  }
  return "Minimum 8 characters, at least 1 number and 1 UPPER case";
};
export const validateCode = (value: any) =>
  value && value.includes("_") ? "Code must not contain space" : undefined;

export const composeValidators =
  (...validators: any) =>
  (value: any) =>
    validators.reduce(
      (error: any, validator: any) => error || validator(value),
      undefined
    );
const getUpperCase = (value: string) => {
  if (value == value.toLowerCase()) {
    return false;
  }
  return true;
};
