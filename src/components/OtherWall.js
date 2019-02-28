import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import axios from '../axios'

import ProfilePic from './ProfilePic'

class OtherWall extends React.Component {
    constructor(props) {
        super(props)
        this.state= {

        }
    }

    render() {
        const {posts} = this.props

        if (!posts) {
            return null
        }
        const user = window.location.pathname.substring(6)
        console.log(posts)
        const filteredpost = posts.filter(post => post['sender_id'] == user)
        console.log(filteredpost)
        return (
            <div className="posts__container__other">
               {filteredpost.length < 1 ? 
                <div className="post__emptymessage">this user didn't post anything yet</div> : 
                filteredpost.map(post => (
                    <div key={post.id} className="post__container">
                        <div className="post">
                            <div className="userpic__container">
                                <ProfilePic 
                                    picture={post['profil_pic']} 
                                    name={post['first_name']}
                                    last={post['last_name']}
                                />
                            </div>
                            <a className="post__content" href={post.link} >
                                <div>
                                    <div className="post__name">{post['first_name']} {post['last_name']}</div>
                                    <div className="post__date">{moment(post['created_at']).fromNow()}</div>
                                </div>
                                <div className="post__publisher">{post.publisher}</div>
                                {post.picture && 
                                    <img className="post__picture" src={post.picture} /> 
                                }
                                <div className="post__text">{post.messages}</div>
                                <div className="post__description">{post.descriptions}</div>
                            </a> 
                        </div>    
                    </div>  
                    )
                )}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {posts: state.posts}
}

export default connect(mapStateToProps)(OtherWall)
