import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


export default function SimpleSlide() {
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <Box sx={{ width: `fit-content` }}>
        <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show"/>
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Paper sx={{ m: 1 }} elevation={4}>
                <Collapse in={open}>
                    <Alert sx={{ mb: 2 }} action={
                        <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}>
                        Close sdfdsfh sdifh lidhsf aisdfh lsdihf me!
                    </Alert>
                </Collapse>
                <Button disabled={open} variant="outlined" onClick={() => {setOpen(true);}}>
                    Re-open
                </Button>    
            </Paper>
        </Slide>
      </Box>
    </Box>
  );
}