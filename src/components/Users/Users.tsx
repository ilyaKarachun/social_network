import React, {FC} from 'react';
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {changeNumberPage, follow, TUsers} from "../../redux/users-reducer";
import userImg from "../../assets/userImg.png"
import s from "./user.module.css"
import {Loader} from "../Loader/Loader";
import {NavLink} from "react-router-dom";
import {getUserIdProfile} from "../../redux/profile-reducer";


export const Users = () => {
    const dispatch = useAppDispatch()

    const changeFollow = (usersId: number) => {
        dispatch(follow(usersId))
    }

    const users = useSelector<AppRootStateType, TUsers[]>(state => state.usersReducer.users)
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize)
    const totalUserCount = useSelector<AppRootStateType, number>(state => state.usersReducer.totalUsersCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage)
    const loader = useSelector<AppRootStateType, boolean>(state => state.usersReducer.loader)

    const page = Math.ceil(totalUserCount / pageSize)
    const pagesArr = []
    for (let i = 1; i <= page; i++) {
        pagesArr.push(i)
    }
    console.log(pagesArr)
    const usersData = users.map((u, i) => <UsersProfile
        name={u.name}
        status={u.status}
        userId={u.id}
        follow={u.followed}
        photos={u.photos.small}
        key={i}
        changeFollow={changeFollow}
    />)

    const changePage = (pageNumber: number) => {
        dispatch(changeNumberPage(pageNumber))
    }
    return (
        <> {loader ?
            <Loader/> :
            <div>
                {pagesArr.map(p => <span
                    style={currentPage === p ? {fontWeight: "bold"} : {fontWeight: "normal"}}
                    onClick={() => changePage(p)}
                >{p}</span>)}
                {usersData}
            </div>}
        </>
    );
};

const UsersProfile: FC<usersProfileT> = ({name, follow, changeFollow, userId, status, photos}) => {
    const dispatch = useAppDispatch()
    const nameBtn = follow ? "follow" : "unfollow"

    const getUserId = (userId: number) => {
        changeFollow(userId)
    }
    const getUserIdHandler = () => getUserId(userId)
    const urlImg = photos ? photos : userImg

    const redirectUserPage = () => {
        dispatch(getUserIdProfile(userId))
    }
    return (
        <div>
            <div>
                {name}
            </div>
            <NavLink to={`/profile/${userId}`} onClick={redirectUserPage}>
                <img alt={"user Avatar"} className={s.img} src={urlImg}/>
            </NavLink>
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