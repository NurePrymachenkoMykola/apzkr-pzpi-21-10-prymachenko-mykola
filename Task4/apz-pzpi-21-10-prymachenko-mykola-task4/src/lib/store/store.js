import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user.slice';
import chatReducer from './slices/chat.slice';

const reducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
})

const store = configureStore({
    reducer,
})

export default store;