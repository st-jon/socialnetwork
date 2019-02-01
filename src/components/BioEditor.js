import React from 'react'
import axios from '../axios'

export default class BioEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showEditBio: false,
            bio: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.showEditor = this.showEditor.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({bio: nextProps.bio})
    }

    handleChange(e) {
        this.bio = e.target.value
    }

    submit(e) {
        e.preventDefault()
        axios.post('/edit/bio', {
            bio: this.bio
        })
        .then((res) => {
            this.props.showBio(res.data.rows[0]['bio'])
            this.setState({
                showEditBio: false
            })
        })
        .catch(err => console.log(err.message))
    }

    showEditor() {
        this.setState({
            showEditBio: true
        })
    }

    render() {
        return ( 
            <div className="bio__container">


                {this.props.bio && !this.state.showEditBio &&
                    <div className="bio__editor">
                        <div>{this.props.bio}</div>
                        <button className="btn__bio" onClick={this.showEditor}>EDIT</button>
                    </div>
                }

                {!this.state.showEditBio && !this.props.bio &&
                    <div onClick={this.showEditor}>add your bio now</div>
                }

                {this.state.showEditBio && 
                    <div className="bio__editor">
                        <textarea className="input__bio" defaultValue={this.state.bio} type="text" name="bio" rows="5" cols="33" onChange={this.handleChange} autoComplete="off" placeholder="let us know more about you" autoFocus/>
                        <button className="btn__bio" onClick={this.submit}>SAVE</button>
                    </div>
                }
            </div>   
        )
    }
}