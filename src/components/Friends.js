import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {receiveFriends, deleteFriend, addFriend} from '../redux/actions'

import ProfilePic from './ProfilePic'

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }

    render() {

        const { friends } = this.props

        if (!friends) {
            return null;
        }
        const oldFriends = friends.filter(item => item.accepted === true)
        const futurFriends = friends.filter(item => item.accepted === false)

        return (
            <div className='friends__container'>
                {oldFriends.length > 0 && <div>You have {oldFriends.length} friends:</div>}
                {oldFriends.map(friend => {
                   return(
                        <div className="card__container" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <ProfilePic
                                    picture={friend['profil_pic']} 
                                    name={friend['first_name']}
                                    last={friend['last_name']}
                                />
                            </Link>
                            <div className="friend__info">
                                <div className="friend__name">{friend['first_name']} {friend['last_name']}</div>
                                <div className="btn__friend__container animated">
                                    <button onClick={() => {this.props.dispatch(deleteFriend(friend.id))}} className="btn__friend">Delete Friend</button>
                                    <div className="blood">
                                        <div className="shine"></div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    )
                })}
                {futurFriends.length > 0 && <div>You have {futurFriends.length} friend requests:</div>}
                {futurFriends.map(friend => {
                    return(
                        <div className="card__container" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <ProfilePic
                                    picture={friend['profil_pic']} 
                                    name={friend['first_name']}
                                    last={friend['last_name']}
                                />
                            </Link>
                            <div className="friend__info">
                                <div className="friend__name">{friend['first_name']} {friend['last_name']}</div>
                                <div className="btn__friend__container animated">
                                    <button onClick={() => {this.props.dispatch(addFriend(friend.id))}} className="btn__friend">Accept Invitation</button>
                                    <div className="blood">
                                        <div className="shine"></div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    )
                 })}
            </div>
        )
    }
}

const mapStateToProps = function(state) {

    return {
        friends: state.friends
    }
}

export default connect(mapStateToProps)(Friends)

