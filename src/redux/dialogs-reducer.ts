import {useState} from "react";

const initialState: dialogsReducerT = {
    dialogData: [
        {id: 1, personName: "Ilya"},
        {id: 2, personName: "Lesha"},
        {id: 3, personName: "Dasha"},
        {id: 4, personName: "Sveta"},
        {id: 5, personName: "Dima"},
    ],
    messageData: [
        {id: 1, message: "Hello! Are u at home?"},
        {id: 2, message: "I have trouble with my motivation"},
        {id: 3, message: "Could u gimme advice about work?"},
    ],
    newMessage: ""
}


export type dialogDataT = {
    id: number,
    personName: string
}

export type messageDataT = {
    id: number,
    message: string
}

export type dialogsReducerT = {
    dialogData: dialogDataT[],
    messageData: messageDataT[],
    newMessage: string,
}

export const dialogsReducer = (state = initialState, action: ActionsT): dialogsReducerT  => {
    switch (action.type){
        case "ADD-NEW-POST-TEXT": {
            return {...state, newMessage: action.newPostText}
        }
        case "ADD-NEW-POST": {
            return { ...state, messageData: [...state.messageData, {id: 4, message: action.newPost}]}
        }
        default:
            return state
    }
}

export const addNewPostTextAC = (newPostText: string) => ({type: "ADD-NEW-POST-TEXT", newPostText} as const);
export const addNewPostAC = (newPost: string) => ({type: "ADD-NEW-POST", newPost} as const);


type ActionsT = ReturnType<typeof addNewPostTextAC> | ReturnType<typeof addNewPostAC>

