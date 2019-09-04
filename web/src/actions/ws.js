import {
    REDUX_WEBSOCKET_CONNECT,
} from './actionTypes';

export function connectWebSocket(token) {
    console.log(token)
    
    return(dispatch)=> {
        dispatch({
            type: REDUX_WEBSOCKET_CONNECT,
            payload: {
              url: 'ws://localhost:8082/ws/'+token
            }
        })
    }
}