import React, {ChangeEvent, FC, useEffect} from 'react';
import '../App.css';
import d from "./Dialogs.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../redux/store";
import {addNewPostAC, addNewPostTextAC, dialogDataT, messageDataT} from "../redux/dialogs-reducer";

type TDialogItem = {
    id: number
    personName: string
}

type TMessage = {
    value: string
    messageId: number
}

export const DialogItem: FC<TDialogItem> = ({id, personName}) => {
    return (
        <div>
            <NavLink to={`/dialogs/${id}`} className={d.item}>
                {personName}
            </NavLink>
        </div>
    )
}

export const Message: FC<TMessage> = ({value, messageId}) => {
    return (
        <div className={d.message}>
            {value}
        </div>
    )
}

export const Dialogs = () => {

    let navigate = useNavigate();
    const isAuth = useAppSelector(state => state.authReducer.isAuth)

    useEffect(() => {
        if (!isAuth){
            return navigate("/login");
        }
    },[isAuth]);

    const newMessage = useSelector<AppRootStateType, string>(
        state => state.dialogsReducer.newMessage)

    const messageData = useSelector<AppRootStateType, messageDataT[]>(
        state => state.dialogsReducer.messageData)

    const dialogData = useSelector<AppRootStateType, dialogDataT[]>(
        state => state.dialogsReducer.dialogData)

    const dispatch = useDispatch()

    const newPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(addNewPostTextAC(e.currentTarget.value))
    }

    const addNewUsersMessage = () => {
        dispatch(addNewPostAC(newMessage))
        dispatch(addNewPostTextAC(""))
    }

    const dialogTeam = dialogData.map(el => <DialogItem id={el.id} personName={el.personName} key={el.id}/>)

    const dialogMessage = messageData.map(el => <Message value={el.message} messageId={el.id}/>)

    return (
        <div className={d.main}>
            <div className={d.items}>
                {dialogTeam}
            </div>
            <div className={d.messages}>
                {dialogMessage}
            </div>
            <div>
            <textarea
                onChange={newPostText}
                value={newMessage}/>
                <button onClick={addNewUsersMessage}>add post</button>
            </div>
        </div>)
}



