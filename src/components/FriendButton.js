import React from 'react'
import axios from '../axios'


export default class FriendButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'Add Friend',
        }
        this.updateFriendStatus = this.updateFriendStatus.bind(this)
    }

    componentDidMount() {
        axios.get(`/status/${this.props.otherUserID}`)
            .then(res => {
                if (res.data.rows[0].accepted === false && res.data.rows[0]['sender_id'] == this.props.otherUserID) {
                    this.setState({text: 'Accept Invitation'})
                }
                else if (res.data.rows[0].accepted === false && res.data.rows[0]['recipient_id'] == this.props.otherUserID) {
                    this.setState({text: 'Cancel Invitation'})
                }
                else if (res.data.rows[0].accepted === true) {
                    this.setState({text: 'Delete Friend'})
                }
            })
            .catch(err => console.log(err.message))
    }

    updateFriendStatus() {
        axios.post(`/status/update`, {
            status: this.state.text,
            otherID: this.props.otherUserID
        })
        .then((res) => {
            if (res.data.command === "INSERT") {
                this.setState({
                    text: 'Cancel Invitation'
                })
            }
            else if (res.data.command === "UPDATE")  {
                this.setState({
                    text: 'Delete Friend'
                })
            }
            else if (res.data.command === "DELETE") {
                this.setState({
                    text: 'Add Friend'
                })
            }
        })
        .catch(err => console.log(err.message))
    }

    render() {
        return (
            <div className="btn__friend__container animated">
                <div className="btn__friend" onClick={this.updateFriendStatus}>{this.state.text}</div>
                <div className="blood">
                    <div className="shine"></div>
                </div>
            </div>    
        )
    }
}

