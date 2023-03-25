import React from 'react';
import {Box, Container, Stack, styled, Typography} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export const Footer: React.FC = () => {
  return (
    <Box>
      <BoxStyled>
        <Container maxWidth="md" sx={{zIndex: 3, position: 'relative'}}>
          <Stack justifyContent="center" alignItems="center">
            <Typography>កម្មវិធីអក្សរខ្មែរ</Typography>
          </Stack>
          <div className="separator" />
          <Stack
            className="options"
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={2}>
            <Stack>
              <CheckBoxIcon />
              <Typography sx={{pl: 0.5}}>ពិនិត្យអក្ខរាវិរុទ្ធ</Typography>
            </Stack>
            <Stack>
              <DescriptionOutlinedIcon />
              <Typography sx={{pl: 0.5}}> ខ្មែរ OCR</Typography>
            </Stack>
            <Stack>
              <MoreVertOutlinedIcon />
              <Typography sx={{pl: 0.5}}>កាត់ពាក្យ</Typography>
            </Stack>
          </Stack>
          <div className="separator" />
        </Container>
      </BoxStyled>
      <Container maxWidth="md">
        <Stack sx={{py: 2}}>
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#999999',
              textAlign: 'center',
            }}>
            កំណត់សម្គាល់៖ លទ្ធផលនៃការត្រួតពិនិត្យអក្ខរាវិរុទ្ធ ឬ OCR
            មិនទាន់ត្រឹមត្រូវ ១០០ ភាគរយនៅឡើយទេ
            តែអាចជួយសម្រួលលោកអ្នកបានក្នុងកម្រិតណាមួយ។
            យើងខ្ញុំនឹងបន្តកែលម្អកម្មវិធីនេះជារៀងរាល់ថ្ងៃ។
            ការបង់សមាជិកភាពរបស់លោកអ្នកអាចជួយពន្លឿនកិច្ចការរបស់យើងខ្ញុំ។
            <br />© 2019 NextSpell
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

const BoxStyled = styled(Box)(({theme}) => ({
  position: 'relative',
  backgroundImage: 'url(https://nextspell.com/intro-banner.jpg)',
  minHeight: 200,
  paddingTop: '30px',
  paddingBottom: '20px',
  backgroundSize: 'cover',
  backgroundPosition: '50% 0',
  backgroundRepeat: 'no-repeat',
  '&::after': {
    backgroundColor: 'rgba(123, 162, 221, 0.7)',
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    transform: 'translateZ(0) scale(1, 1)',
  },
  '.separator': {
    width: '100%',
    margin: '20px auto 15px',
    position: 'relative',
    height: '1px',
    WebkitBackfaceVisibility: 'hidden',
    WebkitTransform: 'translateZ(0) scale(1, 1)',
    '&::after': {
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 35%, rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 0) 100%)',
      height: '1px',
      position: 'absolute',
      bottom: '-1px',
      content: '""',
      width: '100%',
      left: '0',
    },
  },
  '.options': {
    zIndex: 3,
    '& > *': {
      flexDirection: 'row',
      p: {
        color: '#183965',
      },
    },
  },
}));
