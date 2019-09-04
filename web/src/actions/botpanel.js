export function selectItem(newValue) {
    return(dispatch, getState)=> {
        dispatch({
            type: 'BOT_SELECT_ITEM',
            payload: {
                newValue: newValue,
            }
        })
    }
}