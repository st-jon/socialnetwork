import React from 'react'
import { connect } from 'react-redux'

import ProfilePic from './ProfilePic'

class OnlineUsersList extends React.Component {
    constructor() {
        super()
        this.state= {
            showMenu: false
        }
        this.showOnlineMenu = this.showOnlineMenu.bind(this)
    }
    showOnlineMenu() {
       this.setState(prevState => ({
           showMenu: !prevState.showMenu
       }))
    }
    
    render() {
        const {onlineUsers} = this.props

        if (!onlineUsers) {
            return null
        }
        return (
            <div className="onlineUsers__container">
                <div className="online__header" onClick={this.showOnlineMenu}>
                    <div className="header__counter" >People Online: {onlineUsers.length}</div>
                    <svg className="header__open" version="1.1" x="0px" y="0px" viewBox="0 0 744.97797 931.224975" enableBackground="new 0 0 2000 2000" xmlSpace="preserve">
                        <path d="M 31.256,0 C 13.971,0 0,13.972 0,31.257 l 0,682.46596 c 0,17.285 13.971,31.257 31.256,31.257 l 682.46599,0 c 17.285,0 31.256,-13.972 31.256,-31.257 l 0,-338.701 c 0,-17.285 -13.971,-31.25696 -31.256,-31.25696 -17.285,0 -31.258,13.97196 -31.258,31.25696 l 0,307.444 -619.95199,0 0,-619.95196 307.385,0 c 17.28499,0 31.25499,-13.972 31.25499,-31.257 C 401.15199,13.972 387.18199,0 369.897,0 L 31.256,0 Z m 497.29999,0.125 c -17.285,0 -31.256,13.971 -31.256,31.257 0,17.253 13.971,31.259 31.256,31.259 l 109.681,0 -239.93,239.959 c -12.222,12.222 -12.222,31.975 0,44.196 6.096,6.09496 14.098,9.15896 22.101,9.15896 8.001,0 15.972,-3.064 22.097,-9.15896 l 239.959,-239.987 0,109.771 c 0,17.285 14.035,31.257 31.258,31.257 17.285,0 31.256,-14.003 31.256,-31.257 l 0,-185.198 c 0,-17.286 -13.971,-31.257 -31.256,-31.257 l -185.166,0 z"/>
                    </svg>
                </div>
                {this.state.showMenu && <div className="onlineUsers__cards">
                    {onlineUsers.map(user => {
                        return (
                            <div key={user.id} className="onlineUsers__card__container">
                                <ProfilePic 
                                    picture={user['profil_pic']} 
                                    name={user['first_name']}
                                    last={user['last_name']}
                                />
                                <div className="online__name">{`${user['first_name']} ${user['last_name']}`}</div>
                            </div>
                        )
                    })}
                </div>} 
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {onlineUsers: state.onlineUsers}
}

export default connect(mapStateToProps)(OnlineUsersList)