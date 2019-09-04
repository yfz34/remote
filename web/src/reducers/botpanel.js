let initial = { 
    selectitem: 0, 
    precount: 0
}

const botPanelReducer = (state = initial, action) => {
    switch (action.type) {
        case "BOT_SELECT_ITEM":
            return state = {
                ...state,
                precount: state.selectitem,
                selectitem: action.payload.newValue,
            }
        case "BOT_PREVIOS_ITEM":
            return state = {
                ...state,
                selectitem: state.precount,
            }
        default:
            return state
    }
}
export default botPanelReducer