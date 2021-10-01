import React, { Component } from 'react'
import DeleteButton from '../../Components/DeleteButton'
import './TodoItem.scss'
import { ITodoItemProps, ITodoItemState } from '../../types/authTypes'
import { getState } from '../../redux/store'

export default class TodoItem extends Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props)
    this.state = {
      check: props.isChecked,
      props: getState().props,
    }
  }

  handleChange = (): void => {
    const { check } = this.state
    const { id } = this.props
    const { checkTodo } = this.state.props
    checkTodo(id)
    this.setState({ check: !check })
  }

  render() {
    const { id, title } = this.props
    const { check, props } = this.state
    const { onDelete, getList, setEditable, editItem } = props
    return (
      <li className="todoItem__listItem">
        <DeleteButton onDelete={onDelete} id={id} getList={getList} />

        <label htmlFor={id} className="todoItem__label">
          <input
            type="checkbox"
            className="todoItem__checkBox"
            id={id}
            checked={!!check}
            onChange={this.handleChange}
          />
        </label>
        <span
          id={id}
          className={check ? 'todoItem__checkedSpan todoItem__title' : 'todoItem__title'}
          contentEditable={false}
          onClick={setEditable}
          onKeyDown={editItem}
        >
          {title}
        </span>
      </li>
    )
  }
}
