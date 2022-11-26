import {useState} from "react";

const initialState = {
   posts: [
        {id: 1, message: "Winter is coming"},
        {id: 2, message: "I lost my motivation"},
   ],
    newPostText: ""
}

export type TPosts = {
    id: number,
    message: string
}

export type profileReducerT = {
    posts: TPosts[],
    newPostText: string
}

export const profileReducer = (state = initialState, action: ActionsT): profileReducerT  => {
    switch (action.type){
        case "ADD-POST": {
            return {...state, posts: [...state.posts, {id: 5, message: action.newPostText}], newPostText: ""}
        }
        case "ADD-TEXT": {
            return {...state, newPostText: action.newText}
        }
        default:
            return state
    }
}

export const addPostAC = (newPostText: string) => ({type: "ADD-POST", newPostText} as const);
export const addNewTextAC = (newText: string) => ({type: "ADD-TEXT", newText} as const);

type addNewTextT = ReturnType<typeof addNewTextAC>
type addPostT = ReturnType<typeof addPostAC>

type ActionsT = addPostT |  addNewTextT
