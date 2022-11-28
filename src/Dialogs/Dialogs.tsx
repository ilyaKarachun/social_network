import React, {ChangeEvent, FC, useState} from 'react';
import '../App.css';
import d from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
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
    // const dialogData = [
    //     {id: 1, personName: "Ilya"},
    //     {id: 2, personName: "Lesha"},
    //     {id: 3, personName: "Dasha"},
    //     {id: 4, personName: "Sveta"},
    //     {id: 5, personName: "Dima"},
    // ]

    // const messageData = [
    //     {id: 1, message: "Hello! Are u at home?"},
    //     {id: 2, message: "I have trouble with my motivation"},
    //     {id: 3, message: "Could u gimme advice about work?"},
    // ]

    // const [newMessage, setNewMessage] = useState('')
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



