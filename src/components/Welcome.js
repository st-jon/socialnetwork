import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'

export default function Welcome() {
    return (
        <div className='welcome'>
            <h1 className="title">ZombieLand</h1>   
            <div className="title">Keep out ! Deads inside !</div>
            <img className='logo' src="/assets/zombie.jpg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    )
}