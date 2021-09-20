import { Component } from 'react';
import ApiServices from '../Model/apiServices.jsx';

export default class TodoController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      api: new ApiServices('http://localhost:8080'),
    };
  }

  getTodoItems=async (token) => {
    const { getItems } = this.state.api;
    if (token !== '') {
      const items = await getItems(token);
      return items;
    }
    return new Error('token is no exist');
  }

setTodoItemStatusDone = async (id) => {
  const { api, token } = this.state;
  const todo = await api.getById({
    id,
    token: `Bearer ${token}`,
  });
  const data = {
    id,
    checked: !todo[0].checked,
    token: `Bearer ${token}`,
  };
  await api.patch('/api/todo/check', data);
}

  editTodoItem= async (e, id) => {
    const { api, token } = this.state;
    await api.patch('/api/todo/title', {
      id,
      title: e.currentTarget.innerText,
      token: `Bearer ${token}`,
    });
  }

 deleteTodoItem= async (id) => {
   const { api, token } = this.state;

   await api.deleteItem('/api/todo', {
     id,
     token: `Bearer ${token}`,
   });
 }

 addTodoItem= async (item) => { // ok
   const { api, token } = this.state;
   if (item !== '') {
     const newTodo = {
       title: item,
       token: `Bearer ${token}`,
     };
     await api.post('/api/todo', newTodo);
     return 'todo was added';
   }
   return new Error('Can\'t add empty task');
 }
}
