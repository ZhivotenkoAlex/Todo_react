import { Component } from 'react';
import { IUser } from '../types/authTypes';
import {
  IApiData,
  IApiFetch,
  IPost,
  IPostData,
} from '../types/generalTypes';
import { ITodo } from '../types/todoTypes';

// eslint-disable-next-line import/no-extraneous-dependencies
// import 'regenerator-runtime/runtime';

export default class apiServices extends Component {
  constructor(props:string) {
    super(props);
  }

   getById = async (data:IApiData):Promise<Error|ITodo[]> => {
     try {
       const response = await fetch(
         `${this.props}/api/todo/id?id=${data.id}&Authorization=${data.token}`,
       );
       return response.json();
     } catch (error:any) {
       return new Error(error);
     }
   }

  getItems = async (data:string):Promise<Error|[]> => fetch(`${this.props}/api/todo?Authorization=Bearer ${data}`)
    .then((res) => res.clone().json())
    .catch((e) => console.log(e))

  getUser = async (data:string):Promise< IUser|void> => fetch(`${this.props}/api/user?item=${data}`)
    .then((res) => res.clone().json())
    .catch((e) => console.log(e.message))

  deleteItem = async (endPoint:string, data:IApiData):Promise<Response> => {
    const response = await fetch(`${this.props}${endPoint}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
    return response.json();
  }

 patch = async (endPoint:string, data:IApiFetch):Promise<{}> => {
   const response = await fetch(`${this.props}${endPoint}`, {
     method: 'PATCH',
     body: JSON.stringify(data),
   });
   return response.json();
 }

 post = async (endPoint:string, data:IPostData):Promise<void|IPost> => fetch(`${this.props}${endPoint}`, {
   method: 'POST',
   body: JSON.stringify(data),
 })
   .then((res) => res.clone().json())
   .catch((e) => console.log(e))
}
