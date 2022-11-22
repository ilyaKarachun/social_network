import React, {FC} from 'react';

type TPost = {
    message: string
}

export const Post: FC<TPost> = ({message}) => {
    return <div>
        {message}
    </div>
}

