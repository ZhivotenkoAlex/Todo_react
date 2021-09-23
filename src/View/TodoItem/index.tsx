import React, { Component } from 'react';
import DeleteButton from '../../Components/DeleteButton';
import './TodoItem.scss';
import { ITodoItemProps, ITodoItemState } from '../../types/authTypes';

export default class TodoItem extends Component <ITodoItemProps, ITodoItemState> {
  constructor(props:ITodoItemProps) {
    super(props);
    this.state = {
      check: props.isChecked,
    };
  }

  handleChange(id:string, checked:Boolean):void {
    const { checkTodo } = this.props;
    checkTodo(id);
    this.setState({ check: !checked });
  }

  render() {
    const {
      onDelete, id, getList, setEditable, editItem, title,
    } = this.props;
    const { check } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    return (
      <li className = "todoItem__listItem">
        <DeleteButton
          onDelete = {onDelete}
          id = {id}
          getList = {getList}
        />

        <label htmlFor = {id} className = "todoItem__label">
          <input
            type = "checkbox"
            className = "todoItem__checkBox"
            id = {id}
            checked = {!!check}
            onChange = {() => { this.handleChange(id, check); }}
          />
        </label>
        <span
          id = {id}
          className = {check ? 'todoItem__checkedSpan todoItem__title' : 'todoItem__title'}
          contentEditable = {false}
          onClick = {(e) => { setEditable(e); }}
          onKeyDown = {editItem}
        >
          {title}
        </span>
      </li>
    );
  }
}
