import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './routes/auth/login'
import LogOut from './routes/auth/logout'
import Home from './routes/home/home'
import Register from './routes/auth/register'
import Members from './routes/members/members'
import News from './routes/news/news'
import Header from './components/header'
import Footer from './components/footer'
import About from './routes/other/about'
import Bylaws from './routes/other/bylaws'
import UserSettings from './routes/settings/user/user.settings'
import AdminDashboard from './routes/settings/admin/admin.dashboard'
import { useAuth } from './services/users.service'
import './styles/global.css'

export default function App() {

    const { isVerified, isLoggedIn, isAdmin } = useAuth()

    return (
        <div id="wrapper">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/members">
                        {isVerified() ? <Members /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {isLoggedIn() ? <Redirect to="/" /> : <LogIn />}
                    </Route>
                    <Route path="/logout">
                        {isLoggedIn() ? <LogOut /> : <LogIn />}
                    </Route>
                    <Route path="/register">
                        {isLoggedIn() ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/news" component={News} />
                    <Route path="/bylaws" component={Bylaws} />
                    <Route path="/about" component={About} />
                    <Route path ="/settings">
                        {isLoggedIn() ? <UserSettings /> : <Redirect to="/login" />}
                    </Route>
                    <Route path ="/admin/dashboard">
                        {isAdmin() ? <AdminDashboard /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    )
}
