import {useState} from "react";

const initialState = [
        {id: 1, follow: true, fullName: 'Dasha', city: 'minsk'},
        {id: 2, follow: true, fullName: 'Ilya', city: 'minsk'},
        {id: 3, follow: true, fullName: 'Sveta', city: 'minsk'},
        {id: 4, follow: true, fullName: 'Dima', city: 'minsk'},
]


export type TUsers = {
    id: number,
    follow: boolean,
    fullName: string,
    city: string,
}

export const usersReducer = (state = initialState, action: ActionsT): TUsers[]  => {
    switch (action.type) {
        case "FOLLOW-UNFOLLOW": {
            return state.map(u => u.id === action.userID ? {...u, follow: !u.follow} : u)
        }
        default:
            return state
    }
}

export const follow = (userID: number) => ({type: "FOLLOW-UNFOLLOW", userID} as const);

type ActionsT = ReturnType<typeof follow>
