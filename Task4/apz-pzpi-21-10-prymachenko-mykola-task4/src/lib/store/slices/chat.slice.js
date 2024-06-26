import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: '',
    title: '',
    members: [],
    messages: [],
    avatar: ''
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(state, action) {
            const chat = action.payload;
            state.id = chat.id;
            state.title = chat.title;
            state.members = chat.members;
            state.messages = chat.messages;
            state.avatar = chat.avatar;
        },
    }
});

export const {setChat} = chatSlice.actions;
export default chatSlice.reducer;