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
        this.state = {
            isCommentVisible: true
        }
        this.input = React.createRef()
        this.fakeInput = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.chooseFile = this.chooseFile.bind(this)
        this.toggleInput = this.toggleInput.bind(this)
        this.submitLink = this.submitLink.bind(this)
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

    submitLink() {
        if (!this.wallInput) {
            return
        }
        initSocket().emit('new link', {
            url: this.wallInput,
            first: this.props.name,
            last: this.props.last,
            picture: this.props.picture,
        })
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

    toggleInput() {
        this.setState(prevState => ({
            isCommentVisible: !prevState.isCommentVisible
        }))
    }

    render() {
        const {posts} = this.props

        if (!posts) {
            return null
        }
        return (
            <div className="wall__container" >
                {this.state.isCommentVisible && <div className="wall__messagearea" onKeyPress={this.handleKeyPress}>
                    <textarea className="input__wall" onChange={this.handleChange} type="text" name="wallInput" rows="5" cols="35" autoComplete="off" placeholder="Add a post here" autoFocus/>
                    <div className="btn__container">
                        <svg onClick={this.toggleInput} className="btn__link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" x="0px" y="0px" fill="#FFF">
                            <path d="M54.78046,33.94513,49.3349,39.39032a15.86737,15.86737,0,0,1,7.15,4.11945v.00048a15.96454,15.96454,0,0,1,0,22.582L39.25244,83.32324A15.96933,15.96933,0,0,1,16.66687,60.74072l8.07953-8.07855a31.189,31.189,0,0,1-.86658-9.033L11.7171,55.791A22.96932,22.96932,0,0,0,44.20221,88.273L61.43463,71.04248a22.93408,22.93408,0,0,0-6.65417-37.09735Z"/>
                            <path d="M72.02863,5a22.81992,22.81992,0,0,0-16.24305,6.72754L38.55316,28.958a22.99273,22.99273,0,0,0,0,32.48193v.00049A22.80836,22.80836,0,0,0,45.21625,66.046l5.44226-5.442a15.84962,15.84962,0,0,1-7.15558-4.11383v.00049a15.98639,15.98639,0,0,1,0-22.583L60.73535,16.67676a15.9695,15.9695,0,1,1,22.58557,22.583l-8.06256,8.06164a31.1745,31.1745,0,0,1,.9065,7.47986q0,.77847-.03809,1.55072L88.27069,44.20947A22.96851,22.96851,0,0,0,72.02863,5Z"/>
                        </svg>
                        <input ref={this.input} id="wall__input" className="wall__input" type="file" />
                        <svg onClick={this.chooseFile} className="btn__picture" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" x="0px" y="0px" fill="#FFF">
                            <path d="M84.8,26.66H73.13a4.11,4.11,0,0,1-3.68-2.26l-2-4a8.9,8.9,0,0,0-8-4.91H40.54a8.9,8.9,0,0,0-8,4.91l-2,4a4.11,4.11,0,0,1-3.68,2.26H15.2A10.22,10.22,0,0,0,5,36.86V74.29a10.21,10.21,0,0,0,10.2,10.2H84.8A10.21,10.21,0,0,0,95,74.29V36.86A10.22,10.22,0,0,0,84.8,26.66ZM90,74.29a5.2,5.2,0,0,1-5.2,5.2H15.2a5.2,5.2,0,0,1-5.2-5.2V36.86a5.2,5.2,0,0,1,5.2-5.2H26.87a9.08,9.08,0,0,0,8.14-5l2-4a3.92,3.92,0,0,1,3.52-2.16H59.46A3.92,3.92,0,0,1,63,22.67l2,4a9.08,9.08,0,0,0,8.14,5H84.8a5.2,5.2,0,0,1,5.2,5.2Z"/>
                            <path d="M50,37.4A18.18,18.18,0,1,0,68.17,55.58,18.2,18.2,0,0,0,50,37.4Zm0,31.35A13.18,13.18,0,1,1,63.17,55.58,13.19,13.19,0,0,1,50,68.75Z"/><path d="M80.11,36.27a5.28,5.28,0,1,0,5.28,5.28A5.29,5.29,0,0,0,80.11,36.27Zm0,7.56a2.28,2.28,0,1,1,2.28-2.28A2.29,2.29,0,0,1,80.11,43.83Z"/>
                        </svg>
                        <span ref={this.fakeInput} onClick={this.chooseFile} title="choose a file to upload" id="wall__input__fake">choose a file</span>
                        <button onClick={this.submit} className="btn__wall">SEND</button>
                    </div>
                </div>}
                {!this.state.isCommentVisible && <div className="wall__messagearea" onKeyPress={this.handleKeyPress}>
                    <textarea className="input__wall sendLink" onChange={this.handleChange} type="text" name="wallInput" rows="5" cols="35" autoComplete="off" placeholder="Add a link you want to share" autoFocus/>
                    <div className="btn__container">
                        <svg onClick={this.toggleInput} className="btn__comment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" x="0px" y="0px" fill='#FFF'>
                            <path d="M79.76709,5H20.2334a11.99093,11.99093,0,0,0-11.977,11.97754V57.61133A11.99072,11.99072,0,0,0,20.2334,69.58789H56.02246l17.436,23.81738a3.89243,3.89243,0,0,0,7.0332-2.29882v-21.54a11.99264,11.99264,0,0,0,11.252-11.95508V16.97754A11.99052,11.99052,0,0,0,79.76709,5Zm5.97656,52.61133a5.98311,5.98311,0,0,1-5.97656,5.97656H74.4917V84.65918L59.06641,63.58789H20.2334a5.98322,5.98322,0,0,1-5.977-5.97656V16.97754A5.98405,5.98405,0,0,1,20.2334,11H79.76709a5.984,5.984,0,0,1,5.97656,5.97754Z"/><circle cx="69.84583" cy="37.29401" r="5.48334"/><circle cx="50" cy="37.29401" r="5.48334"/><circle cx="30.15417" cy="37.29401" r="5.48334"/>
                        </svg>
                        <button onClick={this.submitLink} className="btn__wall">SEND</button>
                    </div>
                </div>}
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
                                <a className="post__content" href={post.link} target="_blank" rel="noopener noreferrer">
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
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {posts: state.posts}
}

export default connect(mapStateToProps)(Wall)
