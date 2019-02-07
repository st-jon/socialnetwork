import React from 'react'
import axios from '../axios'

import ProfilePic from './ProfilePic'
import FriendButton from './FriendButton'

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            profilePic: '',
            bio: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.id}`)
            .then(data => {
                if(data.data.redirectTo) {
                    this.props.history.push(data.data.redirectTo)
                } else {
                    this.setState({
                        firstName: data.data.rows[0]['first_name'],
                        lastName: data.data.rows[0]['last_name'],
                        profilePic: data.data.rows[0]['profil_pic'],
                        bio: data.data.rows[0]['bio']
                    })
                }  
            })
    }

    render() {
        return (
            <div className="profile__container">
                <div className="profilePic__container">
                    <ProfilePic 
                        picture={this.state.profilePic}
                        name={this.state.firstName}
                        last={this.state.lastName}
                    />
                    <div className="profile__name">{this.state.firstName}</div>
                    <FriendButton  otherUserID={this.props.match.params.id}/>
                </div>
                <div className="profil__info">
                    {this.state.bio && <div className="bio"><em>"{this.state.bio}"</em></div>} 
                    {!this.state.bio && <div className="bio"><em>{this.state.firstName} hasn't written bio</em></div>}    
                </div>  
            </div>
        )
    }
}
