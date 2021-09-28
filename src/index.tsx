import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IAppState } from './types/generalTypes'
import LogProvider from './Context'

const AppContext = React.createContext<Partial<IAppState>>({})
export default AppContext
// import { getState } from './redux/store'
// import Context from './Context'
// import { IAppState } from './types/generalTypes'
// eslint-disable-next-line react/no-render-return-value
// const state = getState() as IAppState
// subscribe(
//   () =>
//     // eslint-disable-next-line react/no-render-return-value
//     ReactDOM.render(
//       <Context.Provider value={state}>
//         <App />
//       </Context.Provider>,
//       document.getElementById('root'),
//     ),
//   // eslint-disable-next-line function-paren-newline
// )

ReactDOM.render(
  <LogProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LogProvider>,
  document.getElementById('root'),
)
