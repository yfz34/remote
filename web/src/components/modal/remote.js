import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { changePlayState, handleVolumeChange, handleSpeedChange, handleNextVideo, handlePreVideo } from '../../actions/remote'

const marks = [
  {
    value: 0.25,
    label: '0.25',
  },
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 0.75,
    label: '0.75',
  },
  {
    value: 1,
    label: '正常',
  },
  {
      value: 1.25,
      label: '1.25',
  },
  {
      value: 1.5,
      label: '1.5',
  },
  {
      value: 1.75,
      label: '1.75',
  },
  {
      value: 2,
      label: '2',
  },
];

function valuetext(value) {
    return `${value}`;
}

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(theme => ({
  root:{
    minWidth:'400px',

  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: 'auto',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function RemoteModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const handleSliderChange = (event, newValue) => {
    props.handleVolumeChange(newValue);
  };
  const handleSpeedChange = (event, newValue) => {
    props.handleSpeedChange(newValue);
  };

  return (
    <Dialog 
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="confirmation-dialog-title"
      open={props.show} 
    >
      <DialogTitle id="confirmation-dialog-title" className={classes.root}>
        遙控器
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          播放速度
        </Typography>
        <Slider
          defaultValue={props.speed}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={0.25}
          min={0.25}
          max={2}
          marks={marks}
          onChangeCommitted={handleSpeedChange} 
        />
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>
          音量控制
        </Typography>
        <PrettoSlider 
          valueLabelDisplay="auto" 
          aria-label="pretto slider" 
          defaultValue={props.volume} 
          onChangeCommitted={handleSliderChange}
        />
      </DialogContent>
      <DialogContent dividers className={classes.controls}>
        <div>
          <IconButton aria-label="previous" onClick={props.handlePreVideo}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={props.changePlayState}>
            { props.play ? <PauseIcon className={classes.playIcon} /> : <PlayArrowIcon className={classes.playIcon} />}
          </IconButton>
          <IconButton aria-label="next" onClick={props.handleNextVideo}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </DialogContent>
      <Button onClick={props.onHide}>關閉</Button>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    modalShowRemote: state.remoteReducer.modalShowRemote,
    play: state.remoteReducer.play,
    loop: state.remoteReducer.loop,
    volume: state.remoteReducer.volume,
    speed: state.remoteReducer.speed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePlayState,
    handleVolumeChange,
    handleSpeedChange,
    handleNextVideo,
    handlePreVideo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteModal)