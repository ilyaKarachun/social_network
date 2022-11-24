import React from 'react';
import '../App.css';
import c from "../Content/content.module.css"

import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "../components/ProfileInfo/ProfileInfo";


export const Profile = () => {
    return <div className={c.content}>
        <ProfileInfo />
        <MyPosts/>
    </div>
}

