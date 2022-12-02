import {Dispatch} from "redux";
import {usersApi} from "../Api/users-api";

const initialState: initialStateT = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type initialStateT = {
    id: number | null,
    email: string | null,
    login: null | string,
    isAuth: boolean,
}

export const authReducer = (state = initialState, action: ActionsT): initialStateT => {
    switch (action.type) {
        case "SET-USER-AUTH-DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

export const setUserAuthData = (email: string, id: number, login: string) => ({
    type: "SET-USER-AUTH-DATA", data: {
        email, id, login
    }
} as const);

export const setUserAuthDataTC = () => async (dispatch: Dispatch) => {
    const res = await usersApi.authMe()
    if (res.data.resultCode === 0) {
        let {email, id, login} = res.data.data
        dispatch(setUserAuthData(email, id, login))
    }
}

type ActionsT = ReturnType<typeof setUserAuthData>

