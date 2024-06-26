import {createSelector} from "@reduxjs/toolkit";

export const selectChat = createSelector(
    (state) => state.chat,
    (chat) => chat,
);