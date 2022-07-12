import React from 'react'
import { AuthProvider } from './services/UsersService'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById("root"))
