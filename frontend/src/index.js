import React from 'react'
import { AuthProvider } from './services/UsersService'
import ReactDOM from 'react-dom'
import App from './App'
import { ArticleProvider } from './services/ArticlesService'

ReactDOM.render(<ArticleProvider><AuthProvider><App /></AuthProvider></ArticleProvider>, document.getElementById("root"))
