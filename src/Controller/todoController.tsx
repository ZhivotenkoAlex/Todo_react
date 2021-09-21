import React, { Component } from 'react';
import ApiServices from '../Model/apiServices.jsx';
import { IAccessToken } from '../types/generalTypes.js';
import { ITodoControllerProps, ITodoControllerState } from '../types/todoTypes';

export default class TodoController extends Component<ITodoControllerProps, ITodoControllerState> {
  constructor(props:ITodoControllerProps) {
    super(props);
    this.state = {
      token: props.token,
      api: new ApiServices('http://localhost:8080'),
    };
  }

  getTodoItems=async (token:IAccessToken|undefined):Promise<Error|[]> => {
    const { getItems } = this.state.api;
    if (token) {
      const items = await getItems(token);
      return items;
    }
    return new Error('token is no exist');
  }

setTodoItemStatusDone = async (id:string):Promise<void> => {
  const { api, token } = this.state;
  const todo = await api.getById({
    id,
    token: `Bearer ${token}`,
  });
  if (todo instanceof Error) {
    return console.log('bull shit');
  }
  const data = {
    id,
    checked: !todo?[0].checked,
    token: `Bearer ${token}`,
  };
  await api.patch('/api/todo/check', data);
}

  editTodoItem= async (e:React.UIEvent<HTMLHtmlElement>, id:string):Promise<void> => {
    const { api, token } = this.state;
    await api.patch('/api/todo/title', {
      id,
      title: e.currentTarget.innerText,
      token: `Bearer ${token}`,
    });
  }

 deleteTodoItem= async (id:string):Promise<void> => {
   const { api, token } = this.state;

   await api.deleteItem('/api/todo', {
     id,
     token: `Bearer ${token}`,
   });
 }

 addTodoItem= async (item:string):Promise<Error|string> => { // ok
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
