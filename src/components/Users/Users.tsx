import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {follow, TUsers} from "../../redux/users-reducer";

export const Users = () => {
    const dispatch = useDispatch()

    const changeFollow = (usersId: number) => {
        dispatch(follow(usersId))
    }
    const users = useSelector<AppRootStateType, TUsers[]>(state => state.usersReducer)
    const usersData = users.map( ( u, i) => <UsersProfile
        name={u.fullName}
        userId={u.id}
        follow={u.follow}
        key={i}
        changeFollow={changeFollow}
    />)

    return (
        <div>
            {usersData}
        </div>
    );
};

const UsersProfile: FC<usersProfileT> = ({name, follow,changeFollow, userId}) => {

    const nameBtn = follow ? "follow" : "unfollow"

    const getUserId = (userId: number) => {
        changeFollow(userId)
    }
    const  getUserIdHandler = () => getUserId(userId)

    return (
        <div>
            <div>
                {name}
            </div>
            <button onClick={getUserIdHandler}>
                {nameBtn}
            </button>
        </div>
    )
}

type usersProfileT = {
    name: string,
    follow: boolean,
    changeFollow: (usersId: number) => void,
    userId: number
}