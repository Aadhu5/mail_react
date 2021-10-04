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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import dateFormat from "dateformat";
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

export default function Detail(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  let [req_data, setReq_data ] = React.useState([]);
  const [param_id, setParam_id] = React.useState('0');
  const [suc_slider, setSuc_slider] = React.useState(false);
  const [alert_tit, setAlert_tit] = React.useState('');
  const [alert_msg, setAlert_msg] = React.useState('');
  const [alert_clr, setAlert_clr] = React.useState('success');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const getAcc = async (id) => {
      await axios.get(process.env.REACT_APP_API_URL+'/update_read/'+id);
      const get_api = await axios.get(process.env.REACT_APP_API_URL+'/mail_detail/'+id);
      if(get_api.data.status==='0')
        {
          setReq_data(get_api.data.data[0].detail[0]); 
        } else {
          setAlert_tit('Alert !'); setAlert_msg(get_api.data.message); setAlert_clr('error'); setSuc_slider(true);
        }
    }
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    setParam_id(id);
    getAcc(id);
  },[])
  const moveTrash = async event => {
    const trash_api = await axios.get(process.env.REACT_APP_API_URL+'/move_trash/'+param_id);
    if(trash_api.data.status==='0')
    {
      setAlert_tit('Alert !'); setAlert_msg('Item moved to trash'); setAlert_clr('success'); setSuc_slider(true);
    } else {
      setAlert_tit('Success !'); setAlert_msg(trash_api.data.message); setAlert_clr('error'); setSuc_slider(true);
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
        <Typography variant="h5" noWrap component="div" className="clr_1" p={2}>Details</Typography>
        </Grid>

        <Grid container rowSpacing={2} p={2}>
          <Grid item xs={2}><Typography gutterBottom component="div">From</Typography></Grid>
          <Grid item xs={10}><Typography gutterBottom component="div" color="app_grey.dark">{req_data.fr_add}</Typography></Grid>
          <Grid item xs={2}><Typography gutterBottom component="div">To</Typography></Grid>
          <Grid item xs={10}><Typography gutterBottom component="div" color="app_grey.dark">{req_data.to_add}</Typography></Grid>
          <Grid item xs={2}><Typography gutterBottom component="div">Date</Typography></Grid>
          <Grid item xs={10}><Typography gutterBottom component="div" color="app_grey.dark">{dateFormat(req_data.a_date,"mmm dS yy, h:MM TT")}</Typography></Grid>
          <Grid item xs={2}><Typography gutterBottom component="div">Subject</Typography></Grid>
          <Grid item xs={10}><Typography gutterBottom component="div" color="app_grey.dark">{req_data.subject}</Typography></Grid>
          <Grid item xs={2}><Typography gutterBottom component="div">Message</Typography></Grid>
          <Grid item xs={8}><Typography gutterBottom component="div" color="app_grey.dark">{req_data.message}</Typography></Grid>
        </Grid>
        <Divider />
        <Grid container rowSpacing={2} p={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={moveTrash}>Move to Trash</Button>
          </Grid>
        </Grid>

        <Grid container rowSpacing={2} p={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Slide direction="up" in={suc_slider} mountOnEnter unmountOnExit>
              <Collapse in={suc_slider}>
                  <Alert severity={alert_clr} sx={{ mb: 2 }} action={
                      <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setSuc_slider(false);}}>
                      <CloseIcon fontSize="inherit" />
                      </IconButton>}>
                      {alert_tit} : <span className="clr_1">{alert_msg}</span>
                  </Alert>
              </Collapse>
            </Slide>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}