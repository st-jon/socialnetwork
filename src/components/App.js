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
            uploaderIsVisible: false,
            firstName: '',
            lastName: '',
            profilePic: '',
            bio: ''
        }
        this.showUploader = this.showUploader.bind(this)
        this.showProfilePic = this.showProfilePic.bind(this)
        this.showBio = this.showBio.bind(this)
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
            .catch(err => {
                console.log(err.message)
            })
    }

    showUploader() {
        this.setState(prevState => ({
            uploaderIsVisible: !prevState.uploaderIsVisible
        }))
    }

    showProfilePic(profilePic) {
        this.setState({
            profilePic
        })
    }

    showBio(bio) {
        this.setState({
            bio
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app__container">
                    <div className="header">
                    <Link className="link" to="/">
                        <img className="logo__tiny" src="/assets/zombie-tiny.jpg" />
                    </Link>
                        <ProfilePic 
                            name={this.state.firstName}
                            picture={this.state.profilePic}
                            uploader={this.showUploader}
                        />
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