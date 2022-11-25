import React, {ChangeEvent, FormEvent, RefObject, useState} from 'react';
import {Post} from "./Post/Post";

type TPostData = {
    id: number
    message: string
}


export const MyPosts = () => {


    const [postData, setPostData] = useState<TPostData[]>([
        {id: 1, message: "Winter is coming"},
        {id: 2, message: "I lost my motivation"},
    ])

    const [newPostText, setNewPostText] = useState<string>("")

    const addPost = () => {
        setPostData([...postData, { id: 3, message: newPostText}])
        setNewPostText("")
    }

    const updateNewPostText = (e: ChangeEvent<HTMLTextAreaElement>,) => {
        setNewPostText(e.currentTarget.value)
    }

    const usersPost = postData.map(el => <Post message={el.message} />)
    return (
        <div>
            MyPosts
            <div>
                <textarea 
                    value={newPostText}
                    onChange={updateNewPostText}
                />
                <button onClick={addPost}>add post</button>
            </div>
            {usersPost}
        </div>
    )
}

