import {
    REDUX_WEBSOCKET_SEND,
} from './actionTypes';

export function showRemoteModal(item) {
  return(dispatch)=> {
    dispatch({
      type: 'SHOW_REMOTE_MODAL',
      payload: {
        item:item
      }
    })
  }
}
  
export function closeRemoteModal() {
  return(dispatch)=> {
    dispatch({
      type: 'CLOSE_REMOTE_MODAL',
    })
    dispatch({
      type: 'BOT_PREVIOS_ITEM',
    })
  }
}

export function changePlayState() {
  return(dispatch, getState)=> {
    // console.log(getState().songlistReducer.select)
    // let msg=JSON.stringify(getState().songlistReducer.select)
    // console.log(String(msg))
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
        type: 'REMOTE_PLAY_STATE',
        playState: getState().remoteReducer.play,
      }
    })
    dispatch({
      type: 'REMOTE_PLAY_STATE',
    })
  }
}

export function changeVolUp() {
  // console.log(vol)
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
        type: 'REMOTE_Vol_UP',
        // playState: getState().remoteReducer.play,
      }
    })
  }
}

export function changeVolDown() {
  //   console.log(vol)
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
        type: 'REMOTE_Vol_DOWN',
        // playState: getState().remoteReducer.play,
      }
    })
  }
}

export function handleVolumeChange(newValue) {
  // console.log(vol)
  // console.log(newValue)
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
        type: 'REMOTE_VOLUME_CHANGE',
        volume: newValue/100,
      }
    })
    dispatch({
      type: 'REMOTE_VOLUME_CHANGE',
      payload: {
        volume: newValue,
      }
    })  
  }
}
  
export function handleSpeedChange(newValue) {
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
        type: 'REMOTE_SPEED_CHANGE',
        speed: newValue,
      }
    })
    dispatch({
      type: 'REMOTE_SPEED_CHANGE',
      payload: {
        speed: newValue,
      }
    }) 
  }
}

export function handleNextVideo() {
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
          type: 'REMOTE_NEXT_VIDEO',
      }
    })
  }
}

export function handlePreVideo() {
  return(dispatch, getState)=> {
    dispatch({
      type: REDUX_WEBSOCKET_SEND,
      payload: {
          type: 'REMOTE_PREVIOUS_VIDEO',
      }
    })
  }
}