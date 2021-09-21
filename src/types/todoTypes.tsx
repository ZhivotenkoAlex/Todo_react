/* eslint-disable no-unused-vars */
import React from 'react';
import { IAccessToken, IApi } from './generalTypes';

export interface ITodoPageProps{
accessToken:string,
refreshToken:string
}
export interface ITodoPageState{
    title:string,
    items:[],
    todoController:{}
}
export interface ITodoControllerProps{
    token:string
}
export interface ITodoControllerState{
        token:string,
        api:IApi
}

export interface ITodoController{
    getTodoItems(token:IAccessToken|undefined):Promise<Error|[]>;
    setTodoItemStatusDone(id:string):Promise<void>;
    editTodoItem(e:React.UIEvent<HTMLHtmlElement>, id:string):Promise<void>;
    deleteTodoItem(id:string):Promise<void>;
    addTodoItem(item:string):Promise<void> ;

}

export interface ITodo{
checked:Boolean,
title:string,
id:string
}
