import React from 'react'
import axios from '../axios'

import ProfilePic from './ProfilePic'

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
                <ProfilePic 
                    picture={this.state.profilePic}
                />
                <div className="profil__info">
                    <div className="profile__name">{this.state.firstName}</div>
                    <div className="bio">{this.state.bio}</div>
                </div>           
            </div>
        )
    }
}

// if(data.redirectTo) {
//     this.props.history.push(data.redirectTo)
// }