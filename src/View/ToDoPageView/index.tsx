/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Container from '../../Components/Container'
import TextInput from '../../Components/TextInput'
import './TodoPageView.scss'
import TodoListView from '../TodoListView'
import TodoController from '../../Controller/todoController'
import { ITodoPageState } from '../../types/todoTypes'
import { ISpanContentEditable } from '../../types/componentsTypes'
import { getState, request, dispatch } from '../../redux/store'
import { Context } from '../../Context'

export default class TodoPageView extends Component<{}, ITodoPageState> {
  static contextType = Context

  constructor(props: {}) {
    super(props)
    this.state = {
      title: '',
      todoController: new TodoController({
        token: '',
      }),
      items: [],
    }
  }

  componentDidMount() {
    const payload = {
      onDelete: this.todoDelete,
      getList: this.getList,
      editItem: this.todoEdit,
      setEditable: this.setEditable,
      checkTodo: this.checkTodo,
    }
    dispatch({ type: 'ADD_PROPS', payload })
    const fetchToken = async () => {
      const { accessToken } = await this.context
      this.setState({
        todoController: new TodoController({
          token: accessToken,
        }),
      })
      this.getList()
    }
    fetchToken()
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget
    this.setState({ title: value })
  }

  getList = async (): Promise<void> => {
    const { getTodoItems } = this.state.todoController
    await request('GET_ITEMS', getTodoItems)
    const { itemList } = getState()
    this.setState({ items: itemList })
  }

  setEditable = (e: React.UIEvent): void => {
    if ((e.detail as typeof e.detail) === 2) {
      ;(e.currentTarget as unknown as ISpanContentEditable).contentEditable = true /* ???? */
    }
  }

  checkTodo = async (id: string): Promise<void> => {
    const { setTodoItemStatusDone } = this.state.todoController
    request('SET_CHECK_TODO', setTodoItemStatusDone, id)
    this.getList()
  }

  todoEdit = (e: React.UIEvent<HTMLHtmlElement> & React.KeyboardEvent): void => {
    const { editTodoItem } = this.state.todoController
    if (e.keyCode === 13) {
      ;(e.currentTarget as unknown as ISpanContentEditable).contentEditable = false
      const { id } = e.currentTarget
      request('EDIT_TODO', editTodoItem, { e, id })
    }
    this.getList()
  }

  todoDelete = async (id: string): Promise<void> => {
    const { deleteTodoItem } = this.state.todoController
    request('DELETE_TODO', deleteTodoItem, id)
    await this.getList()
  }

  handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const { title } = this.state

    const { addTodoItem } = this.state.todoController
    try {
      await request('ADD_ITEM', addTodoItem, title)
      this.getList()
      this.setState({ title: '' })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  render() {
    const { title } = this.state
    return (
      <Container>
        <form>
          <h1 className="todoPage__title">To Do List</h1>
          <div className="todoPage__inputBlock">
            <TextInput placeholder="new task" value={title} onChange={this.onChange} />
            <a href="" className="todoPage__addBtn" onClick={this.handleSubmit}>
              ADD
            </a>
          </div>
        </form>
        <TodoListView />
      </Container>
    )
  }
}
