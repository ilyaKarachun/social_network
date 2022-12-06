import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {updateUserStatusTC} from "../../../redux/profile-reducer";

export const ProfileStatus = () => {
    const [open, setOpen] = useState(true)
    const status = useAppSelector(state => state.profileReducer.status)
    const [inputValue, setInputValue] = useState(status)
    const dispatch = useAppDispatch()

    const statusHandler = () => {
        setOpen(false)
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const setStatusValue = () => {
        dispatch(updateUserStatusTC(inputValue))
        setOpen(true)
    }

    return (<div>
            { open ?
                <div onDoubleClick={statusHandler}>
                {status}
            </div>
            : <input
                    onChange={inputOnChangeHandler}
                    onBlur={setStatusValue}
                    autoFocus={true}
                    value={inputValue}
                />
            }
        </div>
    );
};
