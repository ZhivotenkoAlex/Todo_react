/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import './TodoListView.scss'
import TodoItem from '../TodoItem'
import { getState } from '../../redux/store'
import { ITodo } from '../../types/todoTypes'

export default class TodoListView extends Component<{}, { list: ITodo[] | [] }> {
  constructor(props: {}) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    const arr = async () => {
      this.setState({
        list: getState(),
      })
    }
    arr()
  }

  render() {
    const { itemList } = getState()

    return (
      <div className="todoList__todoBox">
        <ul className="todoList__list">
          {(itemList as ITodo[]).map(({ id, text, checked }) => (
            <TodoItem isChecked={!!checked} key={id} id={id} title={text} />
          ))}
        </ul>
      </div>
    )
  }
}
