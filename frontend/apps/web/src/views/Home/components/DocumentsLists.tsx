import React, {useEffect} from 'react';
import {alpha} from '@mui/material/styles';
import useStates from 'src/hooks/useState';
import {
  Button,
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

export const DocumentsLists: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useStates({items: []});

  const {items} = state;
  // load local storage by use effect
  useEffect(() => {
    const _items = localStorage.getItem('docs');
    if (_items) {
      setState({items: JSON.parse(_items)});
    }
  }, []);

  const handleSort = () => {
    console.log('sort::');
  };

  const handleEdit = (item: any) => {
    router.push(`/nextspell/${item.id}`);
  };

  const handleDelete = (item: any) => {
    const _items = items?.filter((i: any) => i.id != item.id);
    localStorage.setItem('docs', JSON.stringify(_items));
    setState({items: _items});
  };

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
          <Tooltip title="Sort optons">
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
            {items?.map((item: any, index: number) => (
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
                    ':hover': {
                      borderColor: 'darkblue',
                    },
                  }}
                  variant="outlined"
                  onClick={() => handleEdit(item)}>
                  <Stack height={263}>
                    <Typography
                      m={2}
                      variant="body2"
                      sx={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                      {item?.content}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    sx={{
                      pl: 1.5,
                      pr: 1,
                      pt: 2,
                    }}
                    height={75}>
                    <Typography variant="subtitle2" noWrap>
                      {item.title}
                    </Typography>
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
                    ':hover': {
                      '& button': {
                        color: 'red',
                      },
                    },
                  }}>
                  <IconButton size="small" onClick={() => handleDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
