import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import {handleItem, closeModal} from '../../actions/songlist'
import {orderSong} from '../../actions/orderlist'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(1),
    color:'white',
    background: 'green',
  },
  pause: {
    margin: theme.spacing(1),
    color:'white',
    background: 'red',
  },
}));

function Orderlist(props) {
  const classes = useStyles();
  const imgUrl = (id) =>{
    return "https://i.ytimg.com/vi/"+id+"/default.jpg"
  }
  return(
    <div>
      <List 
        aria-label="main folders"
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            點播列表，共{props.playlist.length}筆
          </ListSubheader>
        }
        className={classes.root}
      >
        { props.playlist.map((item, index) => (
            <ListItem button >
            <ListItemIcon style={{ width:120 }}>
                <img src={imgUrl(item.id)} alt="" />
            </ListItemIcon>
            <ListItemText primary={item.title}  />
            { index === props.count ? 
                props.playState ?
                <Chip
                    size="medium"
                    label="播放中"
                    className={classes.chip}
                /> :
                <Chip
                    size="medium"
                    label="暫停"
                    className={classes.pause}
                />
                : null
            }
            </ListItem>
        ))}
      </List>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    playlist: state.orderlistReducer.playlist,
    count: state.orderlistReducer.count,
    playingID: state.orderlistReducer.playingID,
    playState: state.remoteReducer.play,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      handleItem,
      closeModal,
      orderSong,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderlist)