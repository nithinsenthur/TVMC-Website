import React from 'react'
import { AuthProvider } from './services/users.service'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById("root"))
