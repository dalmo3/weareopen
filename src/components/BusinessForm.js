import React  from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { navigate } from '@reach/router';

export const BusinessForm = (props) => (
  <form noValidate autoComplete="off"
  
  onSubmit={ event => {
    
    event.preventDefault()
    const id = event.target.elements[0].value
    event.target.reset()
    
    navigate(`/parameter/${id}`)
  }

  }
  >
    <Typography>This is a form</Typography>
    <TextField id="standard-basic" label="Standard" />
    <Button type="submit">Submit</Button>
  </form>
);
