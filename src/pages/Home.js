import * as React from 'react';
import logo from '../logo.png';
import '../App.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <div className="App">
      <Grid container spacing={0}>
        <Grid item xs={6}>
        <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <p className="Home_ln_1">Meta<span className="Home_ln_2">Mailer</span></p>
        </header>
        </Grid>
        <Grid item xs={6}>
        <header className="Home_part2">
            <Typography variant="h3" component="div" className="Home_p_1">
              Welcome
            </Typography>
            <Typography variant="body1" gutterBottom className="Home_p_1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
              quasi quidem quibusdam.
            </Typography>
            <Button className="Home_btn_1" href={"./Compose"} variant="contained">Get started</Button>
        </header>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
