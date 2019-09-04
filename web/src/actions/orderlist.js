import {
    REDUX_WEBSOCKET_SEND,
} from './actionTypes';

export function orderSong() {
    return(dispatch, getState)=> {
        // console.log(getState().songlistReducer.select)
        // let msg=JSON.stringify(getState().songlistReducer.select)
        // console.log(String(msg))
        dispatch({
            type: REDUX_WEBSOCKET_SEND,
            payload: {
                type: 'OrderVideo',
                channelTitle: getState().songlistReducer.select.channelTitle,
                description: getState().songlistReducer.select.description,
                id:getState().songlistReducer.select.id,
                title:getState().songlistReducer.select.title
            }
        })
        dispatch({
            type: 'CLOSE_MODAL',
        })
    }
}