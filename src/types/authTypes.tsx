/* eslint-disable no-unused-vars */
import React from 'react'
import { ITokens, IApi, IPostData } from './generalTypes'

export interface ILoginPageProps{
    getStatus:(tokens:ITokens)=>void
}

export interface ILoginPageState{
    user:IUserController
}

export interface IUserControllerState{
    api:IApi
}

export interface ILog{}

export interface ICredentials{
    email: string,
    password: string,
}

export interface IError extends Error{
    error:string
}

export interface IUser{
    userId: number,
    name: string,
    email: string,
    password: string,
    token: string,
    date: number,
    expiresIn: number
}

export interface IUserController {
    login(data:ICredentials):Promise<IPostData|Error>,
    register(data:ICredentials):Promise<Error|string>,
    authentification(data:ICredentials):Promise<IPostData|Error|string|void>,
    isLoggedIn(email:string):Promise<Boolean|Error>,
    validateEmail(email:string):Boolean
}

export interface IState {
    email:string,
    password:string,
    user:IUserController
}

export interface ITodoItemProps{
    isChecked: Boolean,
    key: string,
    id: string,
    title: string,
    onDelete(id:string):Promise<void>,
    getList():Promise<void>,
    editItem(e:React.UIEvent<HTMLHtmlElement>&React.KeyboardEvent):void,
    setEditable(e:React.UIEvent):void,
    checkTodo(id:string):Promise<void>,
}

export interface ITodoItemState{
    check:Boolean
}

export interface ITodoListState{}

export interface ITodoListProps{
    itemList : []|Error,
    onDelete(id:string):Promise<void>,
    getList():Promise<void>,
    editItem(e:React.UIEvent<HTMLHtmlElement>&React.KeyboardEvent):void,
    setEditable(e:React.UIEvent):void,
    checkTodo(id:string):Promise<void>,
}
