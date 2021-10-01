/* eslint-disable no-unused-vars */
import React from 'react'
import { IApi } from './generalTypes'

export interface ITodoPageProps {
  accessToken: string
  refreshToken: string
}
export interface ITodoPageState {
  title: string
  items?: [] | Error
  todoController: ITodoController
}
export interface ITodoControllerProps {
  token: string
}
export interface ITodoControllerState {
  token: string
  api: IApi
}

export interface ITodoController {
  getTodoItems(): Promise<Error | []>
  setTodoItemStatusDone(id: string): Promise<Error | [] | void>
  editTodoItem(incomingData: {
    e: React.UIEvent<HTMLHtmlElement> & React.KeyboardEvent
    id: string
  }): Promise<Error | [] | void>
  deleteTodoItem(id: string): Promise<Error | [] | void>
  addTodoItem(item: string): Promise<Error | []>
}

export interface ITodo {
  id: string
  text: string
  checked: number
  userId: number
}

export interface ITodoSetTodoData {
  id: string
  checked: boolean
  token: string
}
