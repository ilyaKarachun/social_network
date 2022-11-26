import React, {ChangeEvent, FormEvent, RefObject, useState} from 'react';
import {Post} from "./Post/Post";
import {useDispatch, useSelector} from "react-redux";
import {addNewTextAC, addPostAC, profileReducer, profileReducerT, TPosts} from "../../redux/profile-reducer";
import {AppRootStateType} from "../../redux/store";

type TPostData = {
    id: number
    message: string
}


export const MyPosts = () => {

    const postData = useSelector<AppRootStateType, profileReducerT>(state => state.profileReducer)
    const dispatch = useDispatch()

    const addPost = () => {
        dispatch(addPostAC(postData.newPostText))
    }

    const updateNewPostText = (e: ChangeEvent<HTMLTextAreaElement>,) => {
        dispatch(addNewTextAC(e.currentTarget.value))
    }

    const usersPost = postData.posts.map(el => <Post message={el.message}/>)

    return (
        <div>
            MyPosts
            <div>
                <textarea
                    value={postData.newPostText}
                    onChange={updateNewPostText}
                />
                <button onClick={addPost}>add post</button>
            </div>
            {usersPost}
        </div>
    )
}

