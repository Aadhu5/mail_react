import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Inbox from './pages/Inbox';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import Sent from './pages/Sent';
import Trash from './pages/Trash';
import Detail_extra from './pages/Detail_extra';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      light: '#fe8830',
      main: '#fe8830',
      dark: '#ff6d00'
    },
    secondary: {
      main: '#fe8830',
      dark: '#ff6d00'
    },
    app_grey: {
      light: '#f7f5f5',
      main: '#f7f5f5',
      dark: '#999999'
    },
    app_white:{
      main: '#ffffff'
    }
  },
  typography: {
    fontFamily: ["Righteous","sans-serif"].join(','),
    h1: {
     fontFamily: '"Righteous","sans-serif',
    }
  }
};
const theme = createTheme(themeOptions);

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App"></div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Home' exact component={Home} />
          <Route path='/Compose' exact component={Compose} />
          <Route path='/Inbox' exact component={Inbox} />
          <Route path='/Detail' exact component={Detail} />
          <Route path='/Profile' exact component={Profile} />
          <Route path='/Sent' exact component={Sent} />
          <Route path='/Trash' exact component={Trash} />
          <Route path='/Detail_extra' exact component={Detail_extra} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
