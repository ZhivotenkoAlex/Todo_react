/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Container from '../../Components/Container/index.jsx';
import TextInput from '../../Components/TextInput/index.jsx';
import s from './TodoPageView.module.css';
import TodoListView from '../TodoListView/index.jsx';
import TodoController from '../../Controller/todoController.jsx';

export default class TodoPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      todoController: new TodoController({ token: props.accessToken }),
      items: [],
    };
  }

  async componentDidMount() {
    this.getList();
  }

  onChange(e) {
    const value = e.currentTarget.value;
    this.setState({ title: value });
  }

  getList=async () => {
    // eslint-disable-next-line react/destructuring-assignment
    const list = await this.state.todoController.getTodoItems(this.props.accessToken);
    this.setState({ items: list });
  }

  // eslint-disable-next-line class-methods-use-this
  setEditable=(e) => {
    if (e.detail === 2) {
      e.currentTarget.contentEditable = true;
    }
  }

  checkTodo=async (id) => {
    await this.state.todoController.setTodoItemStatusDone(id);
    this.getList();
  }

  todoEdit=(e) => {
    if (e.keyCode === 13) {
      e.currentTarget.contentEditable = false;
      const id = e.currentTarget.id;
      this.state.todoController.editTodoItem(e, id);
    }

    this.getList();
  }

  todoDelete=async (id) => {
  // eslint-disable-next-line react/destructuring-assignment
    await this.state.todoController.deleteTodoItem(id);
    this.getList();
  }

   handleSubmit = async (e) => {
     console.log(this.state);
     e.preventDefault();
     const { todoController, title } = this.state;
     const { addTodoItem } = todoController;
     try {
       const todo = await addTodoItem(title);
       if (todo instanceof Error) {
         console.log(todo.message);
       }
       this.getList();
       this.setState({ title: '' });
     } catch (error) {
       console.log(error.message);
     }
   }

   render() {
     return (
       <Container>
         <form>
           <h1 className = {s.title}>To Do List</h1>
           <div className = {s.inputBlock}>
             <TextInput placeholder = "new task" value = {this.state.title} onChange = {(e) => this.onChange(e)} />
             <a href = "" className = {s.addBtn} onClick = {(e) => this.handleSubmit(e)}>ADD</a>
           </div>
         </form>
         <TodoListView
           itemList = {this.state.items}
           onDelete = {this.todoDelete}
           getList = {this.getList}
           editItem = {this.todoEdit}
           setEditable = {this.setEditable}
           checkTodo = {this.checkTodo}
         />
       </Container>
     );
   }
}
