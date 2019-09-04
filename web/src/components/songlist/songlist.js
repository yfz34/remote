import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import OrderModal from '../modal/order'

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
}));

function Songlist(props) {
  const classes = useStyles();
  return(
    <div>
      <List 
        aria-label="main folders"
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            搜尋"{props.input}"結果，共{props.list.length}筆
          </ListSubheader>
        }
        className={classes.root}
      >
        {props.list.map(item => (
        <ListItem button onClick={() => props.handleItem(item)}>
          <ListItemIcon style={{ width:120 }}>
            <img src={item.thumbnails.default.url} alt="" />
          </ListItemIcon>
          <ListItemText primary={item.title}  />
        </ListItem>
        ))}
      </List>
      
      <OrderModal
        show={props.modalShow}
        onHide={props.closeModal}
        select={props.select}
        onOrder={props.orderSong}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    input: state.songlistReducer.input,
    list: state.songlistReducer.list,
    modalShow: state.songlistReducer.modalShow,
    select: state.songlistReducer.select,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      handleItem,
      closeModal,
      orderSong,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Songlist)