import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  margin:{
    padding: '10px 30px',
  },
});

function OrderModal(props) {
  const classes = useStyles();

  return (
    <Dialog onClose={props.onHide} aria-labelledby="simple-dialog-title" open={props.show}>
      <DialogTitle id="simple-dialog-title">
        {props.select.title}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {props.select.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onOrder} variant="contained" size="large" color="primary" className={classes.margin}>
          點播
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderModal