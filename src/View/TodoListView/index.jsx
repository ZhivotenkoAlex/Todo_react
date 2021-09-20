import React, { Component } from 'react';
import s from './TodoListView.module.css';
import TodoItem from '../TodoItem/index.jsx';

export default class TodoListView extends Component {

  render() {
    const {
      itemList, onDelete, getList, editItem, setEditable, checkTodo,
    } = this.props;
    return (
      <div className = {s.todoBox}>
        <ul className = {s.list}>
          {itemList && itemList.map(({ id, text, checked }) => (
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
