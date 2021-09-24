import React, { Component } from 'react'
import ApiServices from '../Model/apiServices'
import { ITodoControllerProps, ITodoControllerState, ITodoSetTodoData } from '../types/todoTypes'

export default class TodoController extends Component<ITodoControllerProps, ITodoControllerState> {
  constructor(props: ITodoControllerProps) {
    super(props)
    this.state = {
      token: props.token,
      api: new ApiServices('http://localhost:8080'),
    }
  }

  getTodoItems = async (token: string): Promise<Error | []> => {
    const { getItems } = this.state.api
    if (token) {
      const items = await getItems(token)
      return items
    }
    return new Error('token is no exist')
  }

  setTodoItemStatusDone = async (id: string): Promise<void> => {
    const { api, token } = this.state
    const { getById } = api

    const todo = await getById({
      id,
      token: `Bearer ${token}`,
    })
    if (todo instanceof Error) {
      return console.log('bull shit')
    }
    const check = todo[0]

    const data: ITodoSetTodoData = {
      id,
      checked: !check.checked,
      token: `Bearer ${token}`,
    }
    await api.patch('/api/todo/check', data)
    return undefined
  }

  // eslint-disable-next-line max-len
  editTodoItem = async (e: React.UIEvent<HTMLHtmlElement> & React.KeyboardEvent, id: string): Promise<void> => {
    const { api, token } = this.state
    const { patch } = api

    await patch('/api/todo/title', {
      id,
      title: e.currentTarget.innerText,
      token: `Bearer ${token}`,
    })
  }

  deleteTodoItem = async (id: string): Promise<void> => {
    const { api, token } = this.state
    const { deleteItem } = api

    await deleteItem('/api/todo', {
      id,
      token: `Bearer ${token}`,
    })
  }

  addTodoItem = async (item: string): Promise<Error | string> => {
    // ok
    const { api, token } = this.state
    const { post } = api

    if (item !== '') {
      const newTodo = {
        title: item,
        token: `Bearer ${token}`,
      }
      await post('/api/todo', newTodo)
      return 'todo was added'
    }
    // eslint-disable-next-line quotes
    return new Error("Can't add empty task")
  }
}
