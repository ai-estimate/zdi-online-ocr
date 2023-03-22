import React, {useEffect} from 'react';
import {alpha, styled} from '@mui/material/styles';
import useStates from 'src/hooks/useState';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import {useRouter} from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import VoidSvg from '@components/svgs/void_.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Koh_Santepheap} from 'next/font/google';

let localStorage: any = {getItem: () => null, setItem: () => null};
if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}

const khmerFont = Koh_Santepheap({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'khmer'],
  display: 'swap',
});

export const DocumentsLists: React.FC = () => {
  const router = useRouter();
  const _items = JSON.parse(localStorage.getItem('docs') || '[]');
  const [state, setState] = useStates({
    items: _items || [],
    toCopy: 'Copy To Clipboard',
    sort: 'ascending',
  });

  const {items, toCopy, sort} = state;

  const handleSort = () => {
    if (items.length == 0) return;
    if (state.sort == 'ascending') {
      items.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setState({sort: 'descending', items: items});
    } else {
      items.sort((a: any, b: any) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
      setState({sort: 'ascending', items: items});
    }
  };

  const handleEdit = (item: any) => {
    router.push(`/nextspell/${item.id}`);
  };

  const handleDelete = (item: any) => {
    const _items = items?.filter((i: any) => i.id != item.id);
    localStorage.setItem('docs', JSON.stringify(_items));
    setState({items: _items});
  };

  const copyToClipboard = (item: any) => {
    var string = item?.content
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/&nbsp;/gi, '\n')
      .trim();
    const el = document.createElement('textarea');
    el.value = string;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setState({toCopy: 'Copied'});
    setTimeout(() => {
      setState({toCopy: 'Copy To Clipboard'});
    }, 2000);
  };
  const reverseItems = items?.reverse();

  return (
    <Container maxWidth="xl">
      <Stack
        position={'sticky'}
        top={64}
        flexDirection="row"
        alignItems="center"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          py: 2,
          zIndex: 2,
        }}
        color={'black'}
        justifyContent={'space-between'}>
        <Typography variant="h6">Recent documents </Typography>
        <div>
          <Tooltip title={`Sort by name ${sort}`}>
            <IconButton onClick={handleSort}>
              <SortByAlphaIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Stack>
      <Grid sx={{flexGrow: 1}} container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            pb: 5,
          }}>
          <Grid container spacing={2}>
            {items?.length == 0 && (
              <Stack
                sx={{
                  pt: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <ImproSvgStyled>
                  <VoidSvg />
                </ImproSvgStyled>
                <Typography>Document empty !</Typography>
              </Stack>
            )}
            {reverseItems?.map((item: any, index: number) => {
              const strippedHtml = item?.content
                ?.replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/gi, '\n')
                .trim();
              return (
                <Grid
                  key={index}
                  item
                  position={'relative'}
                  sx={{
                    width: 230,
                    height: 358,
                  }}>
                  <Paper
                    sx={{
                      cursor: 'pointer',
                      width: 210,
                      height: 338,
                      m: 1,
                      borderRadius: 0.5,
                      display: 'revert',
                      borderColor: 'grey.300',
                      boxShadow: 2,
                      ':hover': {
                        borderColor: 'darkblue',
                      },
                    }}
                    variant="outlined"
                    onClick={() => handleEdit(item)}>
                    <Stack height={263}>
                      <TypographyStyled
                        m={2}
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}>
                        {strippedHtml}
                      </TypographyStyled>
                    </Stack>
                    <Divider />
                    <Stack
                      sx={{
                        pl: 1.5,
                        pr: 1,
                        pt: 2,
                      }}
                      height={75}>
                      <TypographyStyled noWrap>{item.title}</TypographyStyled>
                    </Stack>
                  </Paper>
                  <Stack
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    sx={{
                      position: 'absolute',
                      display: 'block',
                      right: 0,
                      bottom: 0,
                    }}>
                    <Tooltip title={toCopy}>
                      <StyledIconButton
                        size="small"
                        onClick={() => copyToClipboard(item)}>
                        <ContentCopyIcon />
                      </StyledIconButton>
                    </Tooltip>
                    <Tooltip title={'Delete'}>
                      <StyledIconButton
                        size="small"
                        onClick={() => handleDelete(item)}>
                        <DeleteIcon />
                      </StyledIconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const StyledIconButton = styled(IconButton)({
  ':hover': {
    color: 'darkblue',
  },
});

const ImproSvgStyled = styled(Box)({
  svg: {
    width: '16rem !important',
    height: '16rem !important',
  },
});

const TypographyStyled = styled(Typography)({
  fontFamily: khmerFont.style.fontFamily,
});
