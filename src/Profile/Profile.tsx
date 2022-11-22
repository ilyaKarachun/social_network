import React from 'react';
import '../App.css';
import c from "../Content/content.module.css"
import mainPhoto from "../assets/main.jpg"
import {MyPosts} from "./MyPosts/MyPosts";


export const Profile = () => {
    return <div className={c.content}>
        <img className={c.MainImg} src={mainPhoto}/>
        <div>
            ava + description
        </div>
        <MyPosts/>
    </div>
}

