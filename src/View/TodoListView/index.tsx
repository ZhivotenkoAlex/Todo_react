import React, { Component } from 'react';
import './TodoListView.scss';
import TodoItem from '../TodoItem';
import { ITodoListProps, ITodoListState } from '../../types/authTypes';

export default class TodoListView extends Component<ITodoListProps, ITodoListState> {
  render() {
    const {
      itemList, onDelete, getList, editItem, setEditable, checkTodo,
    } = this.props;
    return (
      <div className = "todoList__todoBox">
        <ul className = "todoList__list">
          {(itemList as []).map(({ id, text, checked }) => (
            <TodoItem
              isChecked = {!!checked}
              key = {id}
              id = {id}
              title = {text}
              onDelete = {onDelete}
              getList = {getList}
              editItem = {editItem}
              setEditable = {setEditable}
              checkTodo = {checkTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}
