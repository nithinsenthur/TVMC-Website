import React from 'react'
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import CreateArticle from './CreateArticle'
import EditArticle from './EditArticle' 
import DeleteArticle from './DeleteArticle'
import Article from './Article'
import { useAuth } from '../../services/UsersService'
import '../../styles/articles.css'
import NewsIndex from './Index'

export default function News() {

    const query = new URLSearchParams(useLocation().search)
    const { isAdmin } = useAuth()
    const { url } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={url}>
                    <NewsIndex 
                        title={query.get("title")} 
                        page={parseInt(query.get('page') || '1', 10)} 
                    />
                </Route>
                <Route path={`${url}/create`}>
                    {isAdmin() ? <CreateArticle /> : <Redirect to="/news" /> }
                </Route>
                <Route exact path={`${url}/:title`} component={Article} />
                <Route path={`${url}/edit/:article_title`}>
                    {isAdmin() ? <EditArticle /> : <Redirect to="/news" /> }
                </Route>
                <Route path={`${url}/delete/:article_title`}>
                    {isAdmin() ? <DeleteArticle /> : <Redirect to="/news" /> }
                </Route>
            </Switch>
        </div>
    )
}
