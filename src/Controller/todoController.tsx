import React, { Component } from 'react'
import ApiServices from '../Model/apiServices'
import { ITodoControllerProps, ITodoControllerState, ITodoSetTodoData } from '../types/todoTypes'
import { Context } from '../Context'
import { getState } from '../redux/store'

export default class TodoController extends Component<ITodoControllerProps, ITodoControllerState> {
  static contextType = Context

  constructor(props: ITodoControllerProps) {
    super(props)
    this.state = {
      token: getState().accessToken,
      api: new ApiServices('http://localhost:8080'),
    }
  }

  getTodoItems = async (): Promise<Error | []> => {
    const { getItems } = this.state.api
    const { token } = this.state
    if (token) {
      const items = await getItems(token)
      return items
    }
    return new Error('token is no exist')
  }

  setTodoItemStatusDone = async (id: string): Promise<Error | [] | void> => {
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
    return this.getTodoItems()
  }

  editTodoItem = async (incomingData: {
    e: React.UIEvent<HTMLHtmlElement> & React.KeyboardEvent
    id: string
  }): Promise<Error | [] | void> => {
    const { api, token } = this.state
    const { patch } = api
    const { e, id } = incomingData
    const title = e.currentTarget.innerText

    await patch('/api/todo/title', {
      id,
      title,
      token: `Bearer ${token}`,
    })
    return this.getTodoItems()
  }

  deleteTodoItem = async (id: string): Promise<Error | [] | void> => {
    const { api, token } = this.state
    const { deleteItem } = api

    await deleteItem('/api/todo', {
      id,
      token: `Bearer ${token}`,
    })
    return this.getTodoItems()
  }

  addTodoItem = async (item: string): Promise<Error | []> => {
    const { api, token } = this.state
    const { post } = api

    if (item !== '') {
      const newTodo = {
        title: item,
        token: `Bearer ${token}`,
      }
      await post('/api/todo', newTodo)
      return this.getTodoItems()
    }
    // eslint-disable-next-line quotes
    return new Error("Can't add empty task")
  }
}
