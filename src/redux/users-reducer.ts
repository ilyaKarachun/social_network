import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";

const initialState: any = [
    // {id: 1, follow: true, name: 'Dasha', city: 'minsk'},
    // {id: 2, follow: true, name: 'Ilya', city: 'minsk'},
    // {id: 3, follow: true, name: 'Sveta', city: 'minsk'},
    // {id: 4, follow: true, name: 'Dima', city: 'minsk'},
]

export type TUsers = {
    name: string,
    id: number,
    photos: {
        small: string,
        large: string
    },
    status: string,
    followed: boolean
}

export const usersReducer = (state = initialState, action: ActionsT): TUsers[]  => {
    switch (action.type) {
        case "FOLLOW-UNFOLLOW": {
            return state.map((u: any) => u.id === action.userID ? {...u, followed: !u.follow} : u)
        }
        case "SET-USERS": {
            debugger
            return state = action.user
        }
        default:
            return state
    }
}

export const follow = (userID: number) => ({type: "FOLLOW-UNFOLLOW", userID} as const);
export const setUsers = (user: any) => ({type: "SET-USERS", user} as const);

type ActionsT = ReturnType<typeof follow> | ReturnType<typeof setUsers>
