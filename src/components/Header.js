import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios'

import ProfilePic from './ProfilePic'
import Search from './Search'


export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuIsVisible: false,
        }
        this.logout = this.logout.bind(this)
        this.showMenu = this.showMenu.bind(this)
    }

    showMenu() {
        this.setState(prevState => ({
            menuIsVisible: !prevState.menuIsVisible
        }))
    }

    logout() {
        axios.get('/logout')
            .then(() => window.location.reload())
    }

    render() {
        return (
            <div className="header">
                <Link className="link" to="/">
                    <img className="logo__tiny" title="Home" src="/assets/zombie-tiny.jpg" />
                </Link>
                <Search />
                <div className="header__status">  
                    <ProfilePic 
                        name={this.props.name}
                        last={this.props.last}
                        picture={this.props.picture}
                        uploader={this.props.uploader}
                    />
                    <svg className="menu__icon" onMouseEnter={this.showMenu} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-489 491 100 100" xmlSpace="preserve">
                        <path d="M-394.1,582.8h-4.1v-50.5c0-55.1-81.6-55.1-81.6,0v50.5h-4.1c-4.1,0-4.1,0-4.1,4.1s0,4.1,4.1,4.1h8.2h26.5c0,0,0,0,0.1,0h4  v-18.4c0-6.1-8.2-6.1-20.4-30.6c6.1-6.1,12.2,8.2,16.3,8.2c0,0,2-2,2-4.1l-2-14.3l-4.1-8.2c-2-4.1,4.1-6.1,6.1-2l4.1,8.2l2,6.1h2  v-12.2l-2-12.2c0-4.1,6.1-4.1,6.1,0l2,12.2v12.2h2l2-12.2v-10.2c0-4.1,6.1-4.1,6.1,0v12.2l-2,10.2h2l4.1-6.1v-8.2  c0-4.1,6.1-4.1,6.1,0v10.2l-4.1,14.3c-4.1,18.4-8.2,20.4-8.2,26.5V591h14.2c0.1,0,0.1,0,0.1,0h8.2h8.2c4.1,0,4.1,0,4.1-4.1  S-390,582.8-394.1,582.8z"/>
                    </svg>
                    {this.state.menuIsVisible && 
                        <div>
                            <div onMouseLeave={this.showMenu} className="menu animated">
                                <Link to='/chat'>
                                    <div className="menu-item link">Chat</div>
                                </Link>
                                <Link to='/friends'>
                                    <div className="menu-item link">Friends</div>
                                </Link>
                                <div onClick={this.logout} className="logout menu-item">Logout</div>
                                <div className="blood">
                                    <div className="shine"></div>
                                </div>
                            </div> 
                            
                        </div>
                    }
                </div>
            </div>  
        )
    }
}