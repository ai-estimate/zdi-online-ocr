// import {logEvent} from 'firebase/analytics';
// import {analytics} from 'lib/auth/initFirebase';

// const isProduction = process.env.NODE_ENV !== 'development';

// export const logEventViewSearchResults = (param = {}) => {
//   if (!isProduction) return;
//   logEvent(analytics, 'view_search_results', {
//     ...param,
//   });
// };

// export const logEventSelectContent = (param = {}, location: string) => {
//   if (!isProduction) return;
//   logEvent(analytics, 'select_content', {
//     content_id: location,
//     ...param,
//   });
// };

// export const logEventLogin = (params = {}) => {
//   if (!isProduction) return;
//   logEvent(analytics, 'login', {
//     method: 'Z1DataLogin',
//     ...params,
//   });
// };

// export const logEventSignup = (params = {}) => {
//   if (!isProduction) return;
//   logEvent(analytics, 'sign_up', {
//     method: 'Z1DataLogin',
//     ...params,
//   });
// };
