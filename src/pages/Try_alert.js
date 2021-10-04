import * as React from 'react';
import Box from '@mui/material/Box';

//import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

//import Button from '@mui/material/Button';


import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

export default function SimpleSlide() {
  const [checked, setChecked] = React.useState(false);
  const [slider, setSlider] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <Box sx={{ width: `fit-content` }}>
        <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show"/>
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Collapse in={slider}>
                    <Alert sx={{ mb: 2 }} action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setSlider(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}>
                        Close sdfdsfh sdifh lidhsf aisdfh lsdihf me!
                    </Alert>
                </Collapse>
        </Slide>
      </Box>
    </Box>
  );
}