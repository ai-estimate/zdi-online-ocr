import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (name === null || name === undefined) return;

  if (name.split(' ').length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.slice(0, 3).toUpperCase()}`,
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

interface IPropsBLA {
  name: string;
  onClick?: () => void;
}
export const ZDIBackgroundLetterAvatars = (props: IPropsBLA) => {
  const {name, onClick} = props;
  return <Avatar onClick={onClick} {...stringAvatar(name)} />;
};

interface IPropsIA {
  src: string;
  alt?: string;
  sx?: any;
  onClick?: () => void;
}
export const ZDIImageAvatars = (props: IPropsIA) => {
  const {src, alt, sx, onClick} = props;

  return <Avatar onClick={onClick} sx={sx} alt={alt} src={src} />;
};
