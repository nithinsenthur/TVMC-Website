import React from 'react'
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom'
import CreateArticle from './create.article'
import EditArticle from './edit.article' 
import DeleteArticle from './delete.article'
import Article from './article'
import { useAuth } from '../../services/users.service'
import '../../styles/articles.css'
import NewsIndex from './index'

export default function News() {

    const query = new URLSearchParams(useLocation().search)
    const { isAdmin } = useAuth()
    const { url } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={url}>
                    <NewsIndex query={query.get("search")} />
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
