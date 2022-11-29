import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {follow,  TUsers} from "../../redux/users-reducer";
import userImg from "../../assets/userImg.png"
import s from "./user.module.css"


export const Users = () => {
    const dispatch = useDispatch()

    const changeFollow = (usersId: number) => {
        dispatch(follow(usersId))
    }
    const users = useSelector<AppRootStateType, TUsers[]>(state => state.usersReducer)

    const usersData = users.map( ( u, i) => <UsersProfile
        name={u.name}
        status={u.status}
        userId={u.id}
        follow={u.followed}
        photos={u.photos.small}
        key={i}
        changeFollow={changeFollow}
    />)

    return (
        <div>
            {usersData}
        </div>
    );
};

const UsersProfile: FC<usersProfileT> = ({name, follow,changeFollow, userId,status,photos}) => {

    const nameBtn = follow ? "follow" : "unfollow"

    const getUserId = (userId: number) => {
        changeFollow(userId)
    }
    const  getUserIdHandler = () => getUserId(userId)
    const urlImg = photos ? photos : userImg
    return (
        <div>
            <div>
                {name}
            </div>
            <img className={s.img} src={urlImg}/>
            <div>{status}</div>
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
    userId: number,
    status: string
    photos: string
}