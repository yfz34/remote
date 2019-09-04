const iniitialState = { 
    modalShowRemote: false,

    mute: false, 
    speed: 1,
    volume: 50,
    play:true,
    loop:false,
    full:true,
};

const remoteReducer = (state = iniitialState, action) => {
    switch (action.type) {
        case 'SHOW_REMOTE_MODAL':
        return state = {
            ...state,
            modalShowRemote: true,
        }; 
        case 'CLOSE_REMOTE_MODAL':
        return state = {
            ...state,
            modalShowRemote: false,
        }; 
        case 'REMOTE_PLAY_STATE':
        return state = {
            ...state,
            play: !state.play,
        }; 
        case 'REMOTE_VOLUME_CHANGE':
        return state = {
            ...state,
            volume: action.payload.volume
        }; 
        case 'REMOTE_SPEED_CHANGE':
        return state = {
            ...state,
            speed: action.payload.speed
        }; 
        case 'SET_PLAYER_STATE':
        return state = {
            ...state,
            mute:   action.payload.data.mute, 
            speed:  action.payload.data.speed, 
            volume: (action.payload.data.volume*100), 
            play:   action.payload.data.play, 
            loop:   action.payload.data.loop, 
            full:   action.payload.data.full, 
        }; 
        default:
        return state;
    }
}

export default remoteReducer