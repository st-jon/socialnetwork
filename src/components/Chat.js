import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {initSocket} from '../socket'

import ProfilePic from './ProfilePic'


class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(e) {
        this.chatInput = e.target.value
    }

    submit() {
        const io = initSocket()
        io.emit('new chat message from user', {
            message: this.chatInput,
            first: this.props.name,
            last: this.props.last,
            picture: this.props.picture
        })
        document.querySelector('.input__chat').value = ""
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    componentDidUpdate() {
        if (!this.elem) {
            return null
        }
        this.elem.scrollTop = this.elem.scrollHeight
    }

    render() {
        const {messages} = this.props

        if (!messages) {
            return null
        }
        return (
            <div className="chat__container">
                <div className="screen__container" ref={elem => (this.elem = elem)}>
                        {messages.map(message => (
                                <div 
                                    key={message.id} 
                                    className={message['last_name']===this.props.last && message['first_name']===this.props.name ? "messages__container yours": "messages__container other" }>
                                    <span className="message__date">{moment(message['created_at']).fromNow()}</span>
                                    <div className="message__container">
                                        <ProfilePic 
                                            picture={message['profil_pic']} 
                                            name={message['first_name']}
                                            last={message['last_name']}
                                        />
                                        <div className="message__content">
                                            <div>
                                                <span className="message__name">{message['first_name']}</span> say: 
                                            </div>
                                            <div className="message__text">{message.messages}</div>
                                        </div> 
                                    </div>  
                                </div>
                            )
                        )}
                </div>
                <div className="chat__messagearea" onKeyPress={this.handleKeyPress}>
                    <textarea className="input__chat" onChange={this.handleChange} type="text" name="chatInput" rows="5" cols="35" autoComplete="off" placeholder="type your message here..." autoFocus/>
                    <button onClick={this.submit} className="btn__chat">SEND</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {messages: state.messages}
}

export default connect(mapStateToProps)(Chat)
