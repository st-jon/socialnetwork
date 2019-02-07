import React from 'react'
import axios from '../axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'


import ProfilePic from './ProfilePic'
import Uploader from './Uploader'
import Profile from './Profile'
import OtherProfile from './OtherProfile'



export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            menuIsVisible: false,
            uploaderIsVisible: false,
            firstName: '',
            lastName: '',
            profilePic: '',
            bio: ''
        }
        this.showUploader = this.showUploader.bind(this)
        this.showProfilePic = this.showProfilePic.bind(this)
        this.showBio = this.showBio.bind(this)
        this.logout = this.logout.bind(this)
        this.showMenu = this.showMenu.bind(this)
    }

    componentDidMount() {
        axios.get('/user')
            .then(data => {
                this.setState({
                    firstName: data.data.rows[0]['first_name'],
                    lastName: data.data.rows[0]['last_name'],
                    profilePic: data.data.rows[0]['profil_pic'],
                    bio: data.data.rows[0]['bio']
                })
            })
            .catch(err => console.log(err.message))
    }

    showUploader() {
        this.setState(prevState => ({
            uploaderIsVisible: !prevState.uploaderIsVisible
        }))
    }

    showProfilePic(profilePic) {
        this.setState({profilePic})
    }

    showBio(bio) {
        this.setState({bio})
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
            <BrowserRouter>
                <div className="app__container">
                    <div className="header">
                        <Link className="link" to="/">
                            <img className="logo__tiny" title="Home" src="/assets/zombie-tiny.jpg" />
                        </Link>
                        <div className="header__status">
                            
                            <ProfilePic 
                                name={this.state.firstName}
                                picture={this.state.profilePic}
                                uploader={this.showUploader}
                            />
                            <svg className="menu__icon" onClick={this.showMenu} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-489 491 100 100" xmlSpace="preserve">
                                <path d="M-394.1,582.8h-4.1v-50.5c0-55.1-81.6-55.1-81.6,0v50.5h-4.1c-4.1,0-4.1,0-4.1,4.1s0,4.1,4.1,4.1h8.2h26.5c0,0,0,0,0.1,0h4  v-18.4c0-6.1-8.2-6.1-20.4-30.6c6.1-6.1,12.2,8.2,16.3,8.2c0,0,2-2,2-4.1l-2-14.3l-4.1-8.2c-2-4.1,4.1-6.1,6.1-2l4.1,8.2l2,6.1h2  v-12.2l-2-12.2c0-4.1,6.1-4.1,6.1,0l2,12.2v12.2h2l2-12.2v-10.2c0-4.1,6.1-4.1,6.1,0v12.2l-2,10.2h2l4.1-6.1v-8.2  c0-4.1,6.1-4.1,6.1,0v10.2l-4.1,14.3c-4.1,18.4-8.2,20.4-8.2,26.5V591h14.2c0.1,0,0.1,0,0.1,0h8.2h8.2c4.1,0,4.1,0,4.1-4.1  S-390,582.8-394.1,582.8z"/>
                            </svg>
                            {this.state.menuIsVisible && 
                                <div>
                                    <div className="menu animated">
                                        <div className="menu-item">Friends</div>
                                        <div onClick={this.logout} className="logout menu-item">Logout</div>
                                        <div className="blood">
                                            <div className="shine"></div>
                                        </div>
                                    </div> 
                                    
                                </div>
                            }
                        </div>   
                    </div>
                    <div className="content__container">
                        <Route
                            exact path="/"
                            render={() => (
                                <Profile
                                    name={this.state.firstName} 
                                    uploader={this.showUploader}
                                    picture={this.state.profilePic}
                                    bio={this.state.bio}
                                    showBio={this.showBio}
                                />
                            )}
                        />
                        <Route  path="/user/:id" 
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                        />  
                    </div>  
                    {this.state.uploaderIsVisible && <Uploader showPic={this.showProfilePic} showUploader={this.showUploader} />}
                </div>    
            </BrowserRouter>
            
        )
    }
}



// <Profile 
//     name={`${this.state.firstName} ${this.state.lastName}`} 
//     uploader={this.showUploader}
//     picture={this.state.profilePic}
//     bio={this.state.bio}
//     showBio={this.showBio}
// />