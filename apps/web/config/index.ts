export const Z1_CLIENT_ID = 'unI0sG5uD5ivWEPT9xy48zNXBOiQerslDYb7uBT6';
export const Z1_CLIENT_SECRET =
  'bv1Mqb5QdpS0quz7F0Q4WG65LDA9v1fhkfZX5ULPWs8gXeHURHSODx12sqMzSl8Qel86tYvYcglE0qxD7xtZ4Gudk91rohsn1x3muK4GJhNWlcreYSjGaQbaP2GcHqAo';

// export const Z1_API_HOST = 'http://localhost:8000';
export const Z1_API_HOST = 'https://api.z1datarnd.com';

// export const Z1_ESTIMATE_HOST = 'http://localhost:9090';
export const Z1_ESTIMATE_HOST = 'https://z1estimate.z1datarnd.com';

export const CMA_API_TOKEN = 'sk_7sVMdCMiqaOHAvujky2RPrqXP7DNedzdjvwtgjhhZR4';
export const INDICATION_PLUS_API_TOKEN =
  'sk_Ip5zxMG8NqDMTzuEcnqur8JUxPXY79mv1tUx869YraM';

export const CMA_HOST = 'https://cma.z1datarnd.com';
export const STAGGING_CMA_HOST = 'https://stagging-cma.z1datarnd.com';

export const Z1CLOUD_S3 = 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/';

export const isProduction = () => {
  if (typeof window === 'undefined') return false;
  return window.location.host === 'z1datarnd.com';
};
export const getZ1SegmentKey = () => {
  if (typeof window === 'undefined') return 'AepiWZroRplnNO65xjBFUfgH5Wm5yRGk';

  if (window.location.host === 'z1datarnd.com') {
    return 'AF2oZw5JPtOzO5sEW8UGwUQNzv7yCCSN';
  } else if (window.location.host === 'dev.z1datarnd.com') {
    return 'AepiWZroRplnNO65xjBFUfgH5Wm5yRGk';
  } else {
    return 'AepiWZroRplnNO65xjBFUfgH5Wm5yRGk';
  }
};
