import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reduxWebsocket from '@giantmachines/redux-websocket';

import songlistReducer from './reducers/songlist';
import orderlistReducer from './reducers/orderlist';
import loadingReducer from './reducers/loading';
import remoteReducer from './reducers/remote';
import botPanelReducer from './reducers/botpanel'
// import tokenReducer from './reducers/token';
// import addReducer from './reducers/add';
// import controllerReducer from './reducers//controller';
const reduxWebsocketMiddleware = reduxWebsocket();

const store = createStore(
    combineReducers({
        songlistReducer,
        orderlistReducer,
        loadingReducer,
        remoteReducer,
        botPanelReducer,
    }),
    {},
    applyMiddleware(thunk, logger, reduxWebsocketMiddleware)
);
export default store