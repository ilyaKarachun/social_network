import React from 'react';
import {Post} from "./Post/Post";


export const MyPosts = () => {
    return <div>
        <div>
            MyPosts
            <div>
                <textarea></textarea>
                <button>add post</button>
            </div>
           <Post message={"Winter is coming"}/>
           <Post message={"I tried"}/>
        </div>
    </div>
}

