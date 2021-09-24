import { IUser } from './authTypes'
import { ITodo } from './todoTypes'

/* eslint-disable no-unused-vars */
export interface IAppClass {
  props?: null
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IApiData {
  token: string
  id: string
  accessToken?: string
}

export interface IApiFetch extends IApiData {
  title?: string
  checked?: Boolean | number
}

export interface IPostData {
  title?: string
  accessToken?: string
  refreshToken?: string
  email?: string
  password?: string
}

export interface IAppState {
  isLoggedIn: boolean
  accessToken: string
  refreshToken: string
}

export interface IPost {
  accessToken: string
  refreshToken: string
}

export interface IApi {
  getById(data: IApiData): Promise<Error | ITodo[]>
  getItems(data: string): Promise<Error | []>
  getUser(data: string): Promise<IUser | void>
  deleteItem(endPoint: string, data: IApiData): Promise<Response>
  patch(endPoint: string, data: IApiFetch): Promise<{}>
  post(endPoint: string, data: IPostData): Promise<void | IPost>
}
