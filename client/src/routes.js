import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Room from './components/Room'
import AccountPage from './pages/AccountPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/room' exact>
                    <Room />
                </Route>
                <Route path='/account' exact>
                    <AccountPage />
                </Route>
                <Redirect to="/room" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}