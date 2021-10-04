import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { mainListItems, secondaryListItems } from './default/menu';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import web3 from './default/web3';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
/******************************************************************* */
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
/******************************************************************* */

export default function Compose() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [suc_slider, setSuc_slider] = React.useState(false);
  const [alert_tit, setAlert_tit] = React.useState('');
  const [alert_msg, setAlert_msg] = React.useState('');
  const [alert_clr, setAlert_clr] = React.useState('success');
  const [mail_fr, setmail_fr ] = React.useState('');
  const [mail_to, setmail_to ] = React.useState('');
  const [mail_sub, setmail_sub ] = React.useState('');
  const [mail_msg, setmail_msg ] = React.useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const getAcc = async () => {
        const accounts = await web3.eth.getAccounts();
        setmail_fr(accounts[0]);
    }
    getAcc();
  },[]) 

  const submitForm = async event => {
    event.preventDefault(); setLoader(true);
    const accounts = await web3.eth.getAccounts();
    if(accounts!=='')
    {
      if(mail_fr!=='' && mail_to!== '' && mail_sub!== '' && mail_msg!== '')
      {
        const post_data = { fr_add: mail_fr, to_add: mail_to, subject: mail_sub, message: mail_msg };
        const post_api = await axios.post(process.env.REACT_APP_API_URL+'/insert_mail', post_data);
        if(post_api.data.status==='0')
        {
          setAlert_tit('Alert !'); setAlert_msg('Mail sent successfully'); setAlert_clr('success'); setSuc_slider(true);
          setmail_fr(''); setmail_to(''); setmail_sub(''); setmail_msg(''); setLoader(false);
          setTimeout(() => {
            setSuc_slider(false);
          }, 5000);
        } else {
          setAlert_tit('Alert !'); setAlert_msg(post_api.data.message); setAlert_clr('error'); setSuc_slider(true); setLoader(false);
        }
      } else { 
        setAlert_tit('Alert !'); setAlert_msg('Please enter valid details into the form, And all fields are mandatory'); setAlert_clr('error'); setSuc_slider(true); setLoader(false);
      }
    } else {
      setAlert_tit('Missing !'); setAlert_msg('Please connect your ethereum wallet here. Your ethereum address is missing'); setAlert_clr('error'); setSuc_slider(true); setLoader(false);
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{marginRight: '36px',...(open && { display: 'none' }),}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">Meta<span className="clr_white">Mailer</span></Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>{mainListItems}</List>
        <Divider /><List>{secondaryListItems}</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />

        <Grid container p={2} sx={{flexGrow: 1}}>
          <Grid item xs={12} style={{margin: "0 20%"}} pt={3}>
            <Box sx={{p: 2, bgcolor: 'app_grey.main',}}>
              <form noValidate autoComplete="off" onSubmit={submitForm}>
                <Typography variant="h5" noWrap component="div" className="clr_1" p={2}>Compose</Typography>
                <Grid container rowSpacing={2} p={2}>
                  <Grid item xs={2}><Typography gutterBottom component="div">From</Typography></Grid>
                  <Grid item xs={10}><TextField value={mail_fr} onChange={e => setmail_fr(e.target.value)} fullWidth id="outlined-basic" variant="outlined" disabled /></Grid>
                  <Grid item xs={2}><Typography gutterBottom component="div">To</Typography></Grid>
                  <Grid item xs={10}><TextField value={mail_to} onChange={e => setmail_to(e.target.value)} fullWidth id="outlined-basic" variant="outlined" /></Grid>
                  <Grid item xs={2}><Typography gutterBottom component="div">Subject</Typography></Grid>
                  <Grid item xs={10}><TextField value={mail_sub} onChange={e => setmail_sub(e.target.value)} fullWidth id="outlined-basic" variant="outlined" /></Grid>
                  <Grid item xs={2}><Typography gutterBottom component="div">Message</Typography></Grid>
                  <Grid item xs={10}><TextareaAutosize value={mail_msg} onChange={e => setmail_msg(e.target.value)} aria-label="minimum height" minRows={10} style={{ width: "100%",background: "transparent",borderColor: "#bebcbc" }}/></Grid>
                </Grid>
                <Divider />
                <Grid container rowSpacing={2} p={2}>
                  <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Send</Button></Grid>
                </Grid>
              </form>
              <Slide direction="down" in={suc_slider} mountOnEnter unmountOnExit>
                <Collapse in={suc_slider}>
                    <Alert severity={alert_clr} sx={{ mb: 2 }} action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setSuc_slider(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}>
                        {alert_tit} : <span className="clr_1">{alert_msg}</span>
                    </Alert>
                </Collapse>
              </Slide>
            </Box>
          </Grid>
        </Grid>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader} >
          <CircularProgress color="inherit" />
        </Backdrop>

      </Box>
    </Box>
  );
}