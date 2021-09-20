export interface IAppClass{
    props?:null
}

export interface ITokens{
      accessToken: string,
      refreshToken: string,
}

export interface IAppProps{

}

export interface IAppState{
    isLoggedIn: boolean,
      accessToken: string,
      refreshToken: string,
}
