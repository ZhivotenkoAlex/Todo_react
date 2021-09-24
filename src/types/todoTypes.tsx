/* eslint-disable no-unused-vars */
import React from 'react'
import { IApi } from './generalTypes'

export interface ITodoPageProps {
  accessToken: string
  refreshToken: string
}
export interface ITodoPageState {
  title: string
  items: [] | Error
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
  getTodoItems(token: string): Promise<Error | []>
  setTodoItemStatusDone(id: string): Promise<void>
  editTodoItem(e: React.UIEvent<HTMLHtmlElement> & React.KeyboardEvent, id: string): Promise<void>
  deleteTodoItem(id: string): Promise<void>
  addTodoItem(item: string): Promise<Error | string>
}

export interface ITodo {
  id: number
  text: string
  checked: number
  userId: number
}

export interface ITodoSetTodoData {
  id: string
  checked: boolean
  token: string
}
