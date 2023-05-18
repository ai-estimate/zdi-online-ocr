import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import {getPerformance} from 'firebase/performance';

const firebaseConfig: any = {
  apiKey: 'AIzaSyCu3Dq-n2t746ckDegA7uMoMh6hKKZGrGY',
  authDomain: 'z1-data.firebaseapp.com',
  databaseURL: 'https://z1-data.firebaseio.com',
  projectId: 'z1-data',
  storageBucket: 'z1-data.appspot.com',
  messagingSenderId: 686423912916,
  appId: '1:686423912916:web:750979a6cd7ac4f2466641',
  measurementId: 'G-197RJ1FT3J',
};

let app: any, analytics: any, perf: any;
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  perf = getPerformance(app);
}
export {perf, analytics};
export default app;
