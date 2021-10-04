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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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

export default function Profile() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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
          <Grid item xs={12} style={{margin: "0 30%"}} pt={3}>
            <Box sx={{p: 2, bgcolor: 'app_grey.main',}}>
                <Typography variant="h5" noWrap component="div" className="clr_1" p={2}>Ethereum Accounts</Typography>
                
                <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                    <ListItem button component="a" style={{borderLeft: '5px solid #fe8830'}}>
                        <ListItemText primary={<React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                            0x70C1479897C18aC8f28c17225D936FbeEA33ed7a
                            </Typography>
                            </React.Fragment>} 
                         />
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" style={{borderLeft: '5px solid #fe8830'}}>
                        <ListItemText primary={<React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                            0xdsffdffd9897C18aC8f28c1722590x70C1479897C1
                            </Typography>
                            </React.Fragment>} 
                         />
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" style={{borderLeft: '5px solid #fe8830'}}>
                        <ListItemText primary={<React.Fragment>
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                            18aC8f28cs177C18aC8f28c17225D0x70C147x9897C1
                            </Typography>
                            </React.Fragment>} 
                         />
                    </ListItem>
                    <Divider />
            
            
        </List>


            </Box>
          </Grid>
        </Grid>


      </Box>
    </Box>
  );
}