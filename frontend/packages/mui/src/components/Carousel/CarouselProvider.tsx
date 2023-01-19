import React, {useCallback, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {DialogContent, DialogActions} from '@mui/material';
import {IconButton} from '@mui/material';
import {Button} from '@mui/material';
import {Portal} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {CarouselContext, ICarousel, ICarouselMessage} from './context';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {isVideoType} from './../../utils';
import {BootstrapDialog, BootstrapDialogTitle} from './Styles';

export const CarouselProvider = React.memo(({children}: any) => {
  const [message, setMessage]: any = useState<ICarousel>(null);

  const show: any = useCallback((message: ICarouselMessage) => {
    setMessage({...message});
  }, []);

  const handleClose = () => {
    setMessage(null);
  };

  const open = !!message;
  const actionBtn = message?.actionBtn;
  const single = message?.data?.length === 1;

  return (
    <CarouselContext.Provider value={{show}}>
      {children}
      <Portal>
        <BootstrapDialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md">
          {message?.title && (
            <BootstrapDialogTitle onClose={handleClose}>
              {message.title}
            </BootstrapDialogTitle>
          )}
          <DialogContent dividers>
            <StyledWrapper single={single}>
              <Carousel
                showThumbs={false}
                selectedItem={message?.index}
                dynamicHeight={false}
                swipeable={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <StyledIconButton
                      onClick={onClickHandler}
                      title={label}
                      style={{left: 15}}>
                      <ArrowBackIosIcon className="icon-margin-prev" />
                    </StyledIconButton>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <StyledIconButton
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{right: 15}}>
                      <ArrowForwardIosIcon />
                    </StyledIconButton>
                  )
                }
                showStatus={false}>
                {message?.data?.map((item: any, index: number) => (
                  <div key={index}>
                    {isVideoType(item.mimeType) ? (
                      <ReactPlayer
                        url={item.data}
                        controls={true}
                        width="100%"
                        height="520px"
                      />
                    ) : (
                      <img
                        className="img-carousel"
                        src={item.data}
                        alt={item.mimeType}
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            </StyledWrapper>
          </DialogContent>
          <DialogActions>
            {actionBtn && (
              <Button
                onClick={() => actionBtn.action(handleClose)}
                color="primary"
                autoFocus>
                {actionBtn.label}
              </Button>
            )}
          </DialogActions>
        </BootstrapDialog>
      </Portal>
    </CarouselContext.Provider>
  );
});

const StyledWrapper: any = styled.div`
  .slider-wrapper {
    ul {
      display: ${(p: any) => (p.single ? 'contents !important' : 'flex')};
    }
    .img-carousel {
      ${(props) => props.theme.breakpoints.up('lg')} {
        height: 650px;
      }
      ${(props) => props.theme.breakpoints.up('sm')} {
        height: 550px;
      }
      ${(props) => props.theme.breakpoints.down('sm')} {
        height: 500px;
      }
      ${(props) => props.theme.breakpoints.down('xs')} {
        height: 400px;
      }
      object-fit: contain;
    }
  }
`;
const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    top: calc(50% - 15px);
    z-index: 2;
    background-color: #cacaca;
    opacity: 0.8;
    transition: all 0.5s;
    width: 50px;
    height: 50px;
    cursor: pointer;
    :hover {
      opacity: 1;
      background-color: #cacaca;
      color: #fff;
    }
    .icon-margin-prev {
      margin-left: 8px;
    }
  }
`;
