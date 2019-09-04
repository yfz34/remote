import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {inputTerm, yTSearch} from '../../actions/songlist'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const navStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appbar:{
    color: 'white',
    backgroundColor:'#1E90FF',
    height: '80px'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: '0',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 7, 1, 1),//******/
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

function Nav(props) {
  const handleSubmit=(e)=>{
    e.preventDefault();
    props.yTSearch()
  }
  const classes = navStyles();
  return(
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="static"  >
        <Toolbar style={{height:'100px'}}>
          <Typography className={classes.title} variant="h5" noWrap>
              <b>點播系統</b>
          </Typography>
        
          <form className={classes.search} onSubmit={(e)=>handleSubmit(e)}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
              placeholder="請輸入影片名稱…"
              classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={props.input}
              onChange={props.inputTerm}
            />
          </form>
        </Toolbar>
      </AppBar>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    input: state.songlistReducer.input,
    list: state.songlistReducer.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    inputTerm,
    yTSearch,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)