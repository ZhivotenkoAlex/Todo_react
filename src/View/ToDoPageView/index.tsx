/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Container from '../../Components/Container';
import TextInput from '../../Components/TextInput';
import './TodoPageView.scss';
import TodoListView from '../TodoListView';
import TodoController from '../../Controller/todoController';
import { ITodoPageProps, ITodoPageState } from '../../types/todoTypes';
import { ISpanContentEditable } from '../../types/componentsTypes';

export default class TodoPageView extends Component<ITodoPageProps, ITodoPageState> {
  constructor(props:ITodoPageProps) {
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

  onChange(e:React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    this.setState({ title: value });
  }

  getList = async ():Promise<void> => {
    // eslint-disable-next-line react/destructuring-assignment
    const list = await this.state.todoController.getTodoItems(this.props.accessToken);
    this.setState({ items: list });
  }

  // eslint-disable-next-line class-methods-use-this
  setEditable=(e:React.UIEvent):void => {
    if (e.detail as typeof e.detail === 2) {
      (e.currentTarget as unknown as ISpanContentEditable).contentEditable = true;
    }
  }

  checkTodo=async (id:string):Promise<void> => {
    await this.state.todoController.setTodoItemStatusDone(id);
    this.getList();
  }

  todoEdit=(e:React.UIEvent<HTMLHtmlElement>&React.KeyboardEvent):void => {
    if (e.keyCode === 13) {
      (e.currentTarget as unknown as ISpanContentEditable).contentEditable = false;
      const id = e.currentTarget.id;
      this.state.todoController.editTodoItem(e, id);
    }

    this.getList();
  }

  todoDelete=async (id:string):Promise<void> => {
  // eslint-disable-next-line react/destructuring-assignment
    await this.state.todoController.deleteTodoItem(id);
    this.getList();
  }

   handleSubmit = async (e:React.FormEvent):Promise<void> => {
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
     } catch (error:any) {
       console.log(error.message);
     }
   }

   render() {
     return (
       <Container>
         <form>
           <h1 className = "todoPage__title">To Do List</h1>
           <div className = "todoPage__inputBlock">
             <TextInput placeholder = "new task" value = {this.state.title} onChange = {(e) => this.onChange(e)} />
             <a href = "" className = "todoPage__addBtn" onClick = {(e) => this.handleSubmit(e)}>ADD</a>
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
