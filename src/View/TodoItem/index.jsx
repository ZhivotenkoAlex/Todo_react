import React, { Component } from 'react';
import DeleteButton from '../../Components/DeleteButton/index.jsx';
import s from './TodoItem.module.css';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: props.isChecked,
    };
  }

  handleChange(id, checked) {
    const { checkTodo } = this.props;
    checkTodo(id);
    this.setState({ check: !checked });
  }

  render() {
    const {
      onDelete, id, getList, setEditable, editItem, title,
    } = this.props;
    const { check } = this.state;
    return (
      <li className = {s.listItem}>
        <DeleteButton
          onDelete = {onDelete}
          id = {id}
          getList = {getList}
        />

        <label htmlFor = {id} className = {s.label}>
          <input
            type = "checkbox"
            className = {s.checkBox}
            id = {id}
            checked = {!!check}
            onChange = {() => { this.handleChange(id, check); }}
          />
        </label>
        <span
          id = {id}
          className = {check ? `${s.checkedSpan} ${s.title}` : `${s.title}`}
          contentEditable = {false}
          onClick = {(e) => { setEditable(e); }}
          onKeyDown = {(e) => {
            editItem(e, id);
          }}
        >
          {title}
        </span>
      </li>
    );
  }
}
