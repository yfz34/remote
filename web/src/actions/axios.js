import axios from 'axios'
import { openLoadingComponent, closeLoadingComponent } from './loading'
import { connectWebSocket } from './ws'
let url = "http://localhost:8082"

export function getRoom(value) {
    return (dispatch, getState) => {
        dispatch(openLoadingComponent())
        axios.post(url + '/api/v1/room', {
            token: value
        }).then((res) => {
            console.log(res.data)
            if (res.data.result_code===10){
                dispatch(connectWebSocket(value))
                dispatch(setPlayerState(res.data.playerInfo.playerState))
                dispatch(setPlayList(res.data.playerInfo.playList, res.data.playerInfo.playingVideo))
                // 用法
                sleep(1000).then(() => {
                    dispatch(closeLoadingComponent())
                })
            } else {
                console.log('XXXXXX')
            }
        })
        // .catch((error) => {
        //     console.log(error)
        //     dispatch(cleanSong())
        //     dispatch(deleteuploadComponent())
        // }).then(() => {
        //     dispatch(closeLoadingDialog())
        // })
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function setPlayerState(state){
    console.log(state)
    return(dispatch, getState)=> {
        dispatch({
            type: 'SET_PLAYER_STATE',
            payload: {
                data: state,
            }
        })
    }
}

export function setPlayList(list, playing){
    return(dispatch, getState)=> {
        dispatch({
            type: 'SET_PLAY_LIST',
            payload: {
                list: list,
                playing: playing,
            }
        })
    }
}