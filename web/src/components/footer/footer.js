import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import ShopIcon from '@material-ui/icons/ViewHeadline';
import SettingRemoteIcon from '@material-ui/icons/SettingsRemote';

import RemoteModal from '../modal/remote'

import {showRemoteModal, closeRemoteModal} from '../../actions/remote'
import { selectItem } from '../../actions/botpanel'

const useStyles = makeStyles({
    root: {
        width: '100%',
        position:'fixed', 
        bottom:'0', 
        background:'#E6E6FA', 
        justifyContent:'space-around'
    },
});

function Footer(props){
    const classes = useStyles();

    return(
        <>
            <BottomNavigation
                value={props.selectValue}
                onChange={(event, newValue) => {
                    props.selectItem(newValue)
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction className={classes.button} label="搜尋影片" icon={<SearchIcon />} />
                <BottomNavigationAction className={classes.button} label="播放列表" icon={<ShopIcon />} />
                <BottomNavigationAction className={classes.button} label="遙控器" icon={<SettingRemoteIcon />} onClick={props.showRemoteModal} />
            </BottomNavigation>
            <RemoteModal
                show={props.modalShowRemote}
                onHide={props.closeRemoteModal}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      modalShowRemote: state.remoteReducer.modalShowRemote,
      selectValue: state.botPanelReducer.selectitem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showRemoteModal,
        closeRemoteModal,
        selectItem,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)