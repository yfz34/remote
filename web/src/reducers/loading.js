
let initial = { isopen: false, loadingAlert: "加載資料中 請稍後...." }
const loadingReducer = (state = initial, action) => {
    switch (action.type) {
        case "OPEN_LOADING_COMPONENT":
            return state = {
                ...state,
                isopen: true,
            }
        case "CLOSE_LOADING_COMPONENT":
            return state = {
                ...state,
                isopen: false,
            }
        default:
            return state
    }
}
export default loadingReducer