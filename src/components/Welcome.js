import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'

export default function Welcome() {
    return (
        <div className='welcome'>
            <h1 className="title">ZOMBIE</h1>   
            <div className="subtitle">Don't open ! Dead inside !</div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    )
}