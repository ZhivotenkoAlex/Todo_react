import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IAppState } from './types/generalTypes'
import LogProvider from './Context'

const AppContext = React.createContext<Partial<IAppState>>({})
export default AppContext

ReactDOM.render(
  <LogProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LogProvider>,
  document.getElementById('root'),
)
