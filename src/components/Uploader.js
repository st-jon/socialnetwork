import React from 'react'
import axios from '../axios'


export default class Uploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePic: ''
        }
        this.upload = this.upload.bind(this)
    }

    upload(e) {
        e.preventDefault()
        const profilePic = document.getElementById('file__input').files[0]
        let formData = new FormData()
        formData.append('file', profilePic)
        axios.post('/upload', formData)
            .then(res => {
                this.props.showPic(res.data.rows[0]['profil_pic'])
            })
            .catch(err => console.log(err.message))
    }

    render() {
        return (
        <div className="uploader" onClick={this.props.close}>
            <div className="modal">
                <p className="modal__title">Change your profil picture</p>
                <input id="file__input" className="modal__input" type="file"/>
                <button className="btn__upload" onClick={this.upload}>UPLOAD</button>
            </div>
        </div>
        )
        
    }
}