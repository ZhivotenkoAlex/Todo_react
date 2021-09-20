import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'regenerator-runtime/runtime';

export default class apiServices extends Component {
  constructor(props) {
    super(props);
  }

   getById = async (data) => {
     try {
       const response = await fetch(
         `${this.props}/api/todo/id?id=${data.id}&Authorization=${data.token}`,
       );
       return response.json();
     } catch (error) {
       return console.log(error);
     }
   }

  getItems = async (data) => fetch(`${this.props}/api/todo?Authorization=Bearer ${data}`)
    .then((res) => res.clone().json())
    .catch((e) => console.log(e))

  getUser = async (data) => fetch(`${this.props}/api/user?item=${data}`)
    .then((res) => res.clone().json())
    .catch((e) => console.log(e.message))

  deleteItem = async (endPoint, data) => {
    const response = await fetch(`${this.props}${endPoint}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
    return response.json();
  }

 patch = async (endPoint, data) => {
   const response = await fetch(`${this.props}${endPoint}`, {
     method: 'PATCH',
     body: JSON.stringify(data),
   });
   return response.json();
 }

 post = async (endPoint, data) => fetch(`${this.props}${endPoint}`, {
   method: 'POST',
   body: JSON.stringify(data),
 })
   .then((res) => res.clone().json())
   .catch((e) => console.log(e))
}
