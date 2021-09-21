/* eslint-disable no-unused-vars */
export interface IAppClass{
    props?:null
}

export interface ITokens{
      accessToken: string,
      refreshToken: string,
}
export interface IAccessToken{
    token:string|undefined
}

export interface IApiData extends IAccessToken{
    id:string
}

export interface IApiFetch extends IApiData{
    title?:string,
    checked?:Boolean
}

export interface IPostData extends IAccessToken{
   title:string
}

export interface IAppState{
    isLoggedIn: boolean,
      accessToken: string,
      refreshToken: string,
}

export interface IApi{
    getById(data: IApiData): Promise<Error|[]>;
    getItems(data:IAccessToken):Promise<Error|[]>;
    getUser(data:string):Promise<Response|void>;
    deleteItem(endPoint:string, data:IApiData):Promise<Response>;
    patch(endPoint:string, data:IApiFetch):Promise<{}>;
    post(endPoint:string, data:IPostData):Promise<void>
}
