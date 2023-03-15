import React, {useEffect} from 'react';
import Image from 'next/image';
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

export const DocumentsLists: React.FC = () => {
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
                    borderColor: 'grey.300',
                  }}
                  variant="outlined"
                  square
                  onClick={() => console.log('clicked')}>
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
