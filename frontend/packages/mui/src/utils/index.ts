export const isVideoType = (mimeType: any) => {
  try {
    if (mimeType !== undefined) {
      mimeType = mimeType.replace('video/', '');
      return VIDEO_TYPES.indexOf(mimeType) !== -1;
    }
    return false;
  } catch (e) {
    return false;
  }
};
const VIDEO_TYPES = [
  'video/mp4',
  'mp4',
  'mov',
  'm4v',
  '3gp',
  '3g2',
  '3gpp',
  '3gpp2',
  '3gpp-qcp',
  '3gpp2-qcp',
];
