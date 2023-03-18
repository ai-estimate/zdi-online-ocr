import React, {useEffect} from 'react';
import {alpha} from '@mui/material/styles';
import useStates from 'src/hooks/useState';
import {
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

let localStorage: any = {getItem: () => null, setItem: () => null};
if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
}
export const DocumentsLists: React.FC = () => {
  const router = useRouter();
  const _items = localStorage.getItem('docs');
  const [state, setState] = useStates({items: _items || []});

  const {items} = state;

  const handleSort = () => {
    console.log('sort::');
  };

  const handleEdit = (item: any) => {
    console.log('item::', item);
    router.replace(`/nextspell/${item.id}`);
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
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Stack></Stack>
            {items?.map((item: any, index: number) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    cursor: 'pointer',
                    width: 210,
                    height: 338,
                    m: 1,
                    borderRadius: 0.5,
                    borderColor: 'grey.300',
                    ':hover': {
                      borderColor: 'darkblue',
                    },
                  }}
                  variant="outlined"
                  square
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
                  <Stack sx={{pl: 1.5, pr: 1, py: 2}} height={75}>
                    <Typography variant="subtitle2" noWrap>
                      {item.title}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
