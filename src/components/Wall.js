import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import axios from '../axios'
import {initSocket} from '../socket'
import {addWallMessage} from '../redux/actions'

import ProfilePic from './ProfilePic'

class Wall extends React.Component {
    constructor(props){
        super(props)
        this.input = React.createRef()
        this.fakeInput = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.chooseFile = this.chooseFile.bind(this)
    }

    handleChange(e) {
        this.wallInput = e.target.value
    }

    submit() {
        if (!this.wallInput) {
            return
        }
        const picture = document.getElementById('wall__input').files[0]
        if (picture) {
            let formData = new FormData()
            formData.append('file', picture)
            formData.append('message', this.wallInput)
            formData.append('first', this.props.name)
            formData.append('last', this.props.last)
            formData.append('picture', this.props.picture)
            axios.post('/wallWithPicture', formData)
                .then(data => {
                    this.props.dispatch(addWallMessage({
                        messages: data.data.rows[0].messages,
                        'first_name': data.data.rows[0]['first_name'],
                        'last_name': data.data.rows[0]['last_name'],
                        'profil_pic': data.data.rows[0]['profil_pic'] === "null" ? null : data.data.rows[0]['profil_pic'] ,
                        picture: data.data.rows[0].picture,
                        id: data.data.rows[0].id
                    }))
                })
                .catch(err => err.message)
        } else {
            axios.post('/wallNoPicture', {
                message: this.wallInput.trim(),
                first: this.props.name,
                last: this.props.last,
                picture: this.props.picture,
            })
            .then(data => {
                this.props.dispatch(addWallMessage({
                    messages: data.data.rows[0].messages,
                    'first_name': data.data.rows[0]['first_name'],
                    'last_name': data.data.rows[0]['last_name'],
                    'profil_pic': data.data.rows[0]['profil_pic'],
                    picture: data.data.rows[0].picture,
                    id: data.data.rows[0].id
                }))
            })
            .catch(err => console.log(err.message))
        }
        document.querySelector('.input__wall').value = ""
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    chooseFile() {
       let input = document.getElementById('wall__input')
       input.click()
       let fakeInput = document.getElementById('wall__input__fake')
       input.addEventListener('change', function() {
            let file = input.value.split("\\")
            let fileName = file[file.length-1]
            if (fileName.length > 0) {
                fakeInput.innerHTML = `choosed file: ${fileName}`
            } else if (fileName === "") {
                fakeInput.innerHTML = 'choose a file'
            }  
        })
    }

    render() {
        const {posts} = this.props

        if (!posts) {
            return null
        }
        return (
            <div className="wall__container" >
                <div className="wall__messagearea" onKeyPress={this.handleKeyPress}>
                    <textarea className="input__wall" onChange={this.handleChange} type="text" name="wallInput" rows="5" cols="35" autoComplete="off" placeholder="let us know what's in your mind..." autoFocus/>
                    <div className="btn__container">
                        <button onClick={this.submit} className="btn__wall">SEND</button>
                        <input ref={this.input} id="wall__input" className="wall__input" type="file" />
                        <span ref={this.fakeInput} onClick={this.chooseFile} title="choose a file to upload" id="wall__input__fake">choose a file</span>
                    </div>
                </div>
                <div className="posts__container">
                    {posts.map(post => (
                        <div key={post.id} className="post__container">
                            <div className="post">
                                <div className="userpic__container">
                                    <ProfilePic 
                                        picture={post['profil_pic']} 
                                        name={post['first_name']}
                                        last={post['last_name']}
                                    />
                                </div>
                                <div className="post__content">
                                    <div>
                                        <div className="post__name">{post['first_name']} {post['last_name']}</div>
                                        <div className="post__date">{moment(post['created_at']).fromNow()}</div>
                                    </div>
                                    {post.picture && 
                                        <img className="post__picture" src={post.picture} /> 
                                    }
                                    <div className="post__text">{post.messages}</div>
                                </div> 
                            </div>    
                        </div>  
                        )
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {posts: state.posts}
}

export default connect(mapStateToProps)(Wall)
