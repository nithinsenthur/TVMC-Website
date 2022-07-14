import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './routes/auth/Login'
import LogOut from './routes/auth/Logout'
import Home from './routes/home/Home'
import Register from './routes/auth/Register'
import Verify from './routes/auth/Verify'
import Members from './routes/members/Members'
import News from './routes/news/News'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './routes/other/About'
import Bylaws from './routes/other/Bylaws'
import UserSettings from './routes/settings/user/user.settings'
import AdminDashboard from './routes/settings/admin/admin.dashboard'
import { useAuth } from './services/UsersService'
import './styles/Global.css'
import NotFound from './routes/other/NotFound'

export default function App() {

    const { isVerified, isLoggedIn, isAdmin } = useAuth()

    return (
        <div id="wrapper">
            {
            (isVerified() || !isLoggedIn())
            ?
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/members">
                        {isLoggedIn() ? <Members /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/login">
                        {isLoggedIn() ? <Redirect to="/" /> : <LogIn />}
                    </Route>
                    <Route exact path="/logout">
                        {isLoggedIn() ? <LogOut /> : <LogIn />}
                    </Route>
                    <Route exact path="/register">
                        {isLoggedIn() ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/verify">
                        {!isVerified() && isLoggedIn() ? <Verify /> : <Redirect to="/" /> }
                    </Route>
                    <Route path="/news" component={News} />
                    <Route exact path="/bylaws" component={Bylaws} />
                    <Route exact path="/about" component={About} />
                    <Route path ="/settings">
                        {isLoggedIn() ? <UserSettings /> : <Redirect to="/login" />}
                    </Route>
                    <Route path ="/admin/dashboard">
                        {isAdmin() ? <AdminDashboard /> : <Redirect to="/login" />}
                    </Route>
                    <Route component={NotFound} / >
                </Switch>
                <Footer />
            </BrowserRouter>
            :
            <Verify />
            }
        </div>
    )
}
