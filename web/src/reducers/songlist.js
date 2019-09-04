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
    input: '', 
    list: [],
    select: item,
    modalShow: false

};

const songlistReducer = (state = iniitialState, action) => {
    switch (action.type) {
        case 'inputTerm':
        return state = {
            ...state,
            input: action.payload.term
        };
        case 'SEARCH_YT_API':
        return state = {
            ...state,
            list: action.payload.obj
        }; 
        case 'CHOOSE_ITEM':
        return state = {
            ...state,
            modalShow: true,
            select: action.payload.item
        }; 
        case 'CLOSE_MODAL':
        return state = {
            ...state,
            modalShow: false,
            select: item
        }; 
        default:
        return state;
    }
}

export default songlistReducer