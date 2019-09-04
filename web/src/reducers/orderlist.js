import {
    REDUX_WEBSOCKET_MESSAGE,
} from '../actions/actionTypes';
const sauce={
    height: 0,
    url: '',
    width: 0,
}

const thumbnails={
    default: sauce,
    high: sauce,
    medium: sauce,
}

const item={
    channelId: '',
    channelTitle: '',
    description: '',
    id:'',
    kind: '',
    link: '',
    publishedAt: '',
    thumbnails: thumbnails,
    title:'',
}

const iniitialState = { 
    // list: [],
    count:-1,
    select: item,
    type: 'Waiting',
    playlist:[],
    playingID: '',
};
let videoObj = {
    // type: 'OrderVideo',
    channelTitle: '',
    description: '',
    id:'',
    title:'',
}
const orderlistReducer = (state = iniitialState, action) => {
    switch (action.type) {
        case 'ORDER_SONG':
        return state = {
            ...state,
            select: action.payload.select
        };
        case REDUX_WEBSOCKET_MESSAGE:
            let obj = JSON.parse(action.payload.message)
            if (obj.type==='OrderVideo'){
                videoObj={
                    channelTitle: obj.channelTitle,
                    description: obj.description,
                    id:obj.id,
                    title:obj.title,
                }
                if (state.count===-1 || state.type==='Waiting'){    
                    state = {
                        ...state,
                        type: 'Playing',
                        playingID: obj.id,
                        count: state.count + 1, 
                    }
                } else {
                    state = {
                        ...state,
                        type: 'Playing',
                    }
                }
                state = {
                    ...state,
                    playlist: [...state.playlist, videoObj],
                }
            }
            if (obj.type==='REMOTE_NEXT_VIDEO'){
                // console.log(state.playlist.length)
                // console.log(state.count)
                if(state.count !== -1 && state.playlist.length-1 !== state.count){
                    state = {
                        ...state,
                        playingID: state.playlist[state.count+1].id,
                        count: state.count+1,
                    }
                }
            }
            if (obj.type==='REMOTE_PREVIOUS_VIDEO'){
                // console.log(state.playlist.length)
                // console.log(state.count)
                if(state.count > 0){
                    state = {
                        ...state,
                        playingID: state.playlist[state.count-1].id,
                        count: state.count-1,
                    }
                }
            }
            if (obj.type==='END_OF_VIDEO'){
                if(state.playlist.length-1 === state.count){
                    state = {
                        ...state,
                        type: 'Waiting',
                    }
                } else {
                    state = {
                        ...state,
                        playingID: state.playlist[state.count+1].id,
                        count: state.count+1,
                    }
                }
            }
        return state = {
            ...state,
        }
        case 'SET_PLAY_LIST':
            // console.log('123132132132', action.payload.list)
            if (action.payload.list == null){
                state = {
                    ...state,
                    playlist: [],
                    playingID: action.payload.playing.videoId,
                    count: action.payload.playing.count,
                    type: action.payload.playing.type,
                }
            } else {
                state = {
                    ...state,
                    playlist: action.payload.list,
                    playingID: action.payload.playing.videoId,
                    count: action.payload.playing.count,
                    type: action.payload.playing.type,
                }
            }
            
        return state = {
            ...state,
        };
        default:
        return state;
        
    }
}

export default orderlistReducer