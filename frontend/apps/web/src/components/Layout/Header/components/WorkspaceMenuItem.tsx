// import React from 'react';
// import {
//   MenuItem,
//   Stack,
//   Typography,
//   Button,
//   Divider,
//   Avatar,
//   Popover,
// } from '@mui/material';
// import Check from '@mui/icons-material/Check';
// import {useAuth} from '@z1data/graphql';
// import {LoadingOverlay} from '@zdi/mui';

// const WorkspaceMenuItem = React.memo(({orgs}: any) => {
//   const {user, onSwitchAccount}: any = useAuth();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;
//   const org = user.organization;

//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleChangeWorkspace = async (item: any) => {
//     setLoading(true);
//     const data = await onSwitchAccount(item.id);
//     if (data?.errors?.length) {
//       return {organization: data?.errors[0].message};
//     }
//     setLoading(false);
//     handleClose();
//     window?.location?.reload();
//   };
//   const getAvatar = (name: string) => {
//     if (!name) return '';
//     return name.substring(0, 2).toUpperCase();
//   };

//   return (
//     <>
//       <MenuItem
//         disableRipple
//         sx={{
//           p: 1,
//           cursor: 'default',
//           ':hover': {
//             backgroundColor: 'transparent',
//           },
//         }}>
//         <Stack flex="1">
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: '10px',
//               lineHeight: '14px',
//               color: '#667085',
//               pb: 1,
//             }}>
//             WORKSPACE
//           </Typography>
//           <Stack direction="row" alignItems="center" pl={0.5}>
//             <Avatar src={''}>{getAvatar(org?.name)}</Avatar>
//             <Stack>
//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: 400,
//                   fontSize: '12px',
//                   lineHeight: '18px',
//                   color: '#003566',
//                 }}>
//                 {org?.name}
//               </Typography>
//             </Stack>
//           </Stack>
//           <Stack pt={2}>
//             {orgs.length > 1 && (
//               <Button
//                 variant="text"
//                 fullWidth
//                 size="small"
//                 disableRipple
//                 sx={{
//                   justifyContent: 'flex-start',
//                   fontFamily: 'Inter',
//                   fontSize: '14px',
//                   lineHeight: '20px',
//                   color: '#344054',
//                   ':hover': {
//                     color: '#003566',
//                   },
//                 }}
//                 onClick={handleClick}>
//                 Switch workspace
//               </Button>
//             )}
//             <Popover
//               id={id}
//               open={open}
//               anchorEl={anchorEl}
//               onClose={handleClose}
//               sx={{
//                 '&.MuiPopover-root': {
//                   left: '-14px',
//                 },
//               }}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}>
//               <Stack sx={{width: 216, height: 200}}>
//                 <LoadingOverlay loading={loading} />
//                 {orgs.map((item: any, index: any) => (
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     sx={{
//                       px: 1,
//                       py: 0.5,
//                       mx: 1,
//                       mb: 0.5,
//                       mt: index === 0 ? 0.5 : 0,
//                       borderRadius: '4px',
//                       fontWeight: 400,
//                       lineHeight: '20px',
//                       fontFamily: 'Inter',
//                       fontSize: '14px',
//                       ':hover': {
//                         color: '#003566',
//                         backgroundColor: '#F1F4F7',
//                         cursor: 'pointer',
//                       },
//                     }}
//                     key={index}
//                     onClick={() => {
//                       handleChangeWorkspace(item);
//                     }}>
//                     {item.name}
//                     {item.id === org?.id && (
//                       <Check
//                         sx={{color: '#12B76A', width: '15px', height: '15px'}}
//                       />
//                     )}
//                   </Stack>
//                 ))}
//               </Stack>
//             </Popover>
//           </Stack>
//         </Stack>
//       </MenuItem>
//       <Divider sx={{'&.MuiDivider-root': {margin: '0px'}}} />
//     </>
//   );
// });

// export default WorkspaceMenuItem;
