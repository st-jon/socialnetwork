import React from 'react'
import axios from '../axios.js'
import { Link } from 'react-router-dom'


export default class Registration extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            erroMessage: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(e) {
        this[e.target.name] = e.target.value
    }

    submit() {
        axios.post('/register', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }).then(({data}) => {
            console.log(data)
            if (data.success) {
                location.replace('/')
            } else if (data.error){
                this.setState({
                    error: true,
                    errorMessage: data.error
                })
            } else {
                this.setState({
                    error: true,
                    errorMessage: 'Ooops !'
                })
            }
        })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    render() {
        return (
            <div onKeyPress={this.handleKeyPress} className="form__registration">
                {this.state.error && <div className="error">{this.state.errorMessage}</div>}
                <input className="input__registration" type="text" name="firstName" onChange={this.handleChange} autoComplete="off" placeholder="first name" autoFocus/>
                <input className="input__registration" type="text" name="lastName" onChange={this.handleChange} autoComplete="off" placeholder="last name" />
                <input className="input__registration" type="text" name="email" onChange={this.handleChange} autoComplete="off" placeholder="email" />
                <input className="input__registration" type="password" name="password" onChange={this.handleChange} autoComplete="off" placeholder="password" />
                <button className="btn__registration" onClick={this.submit}>REGISTER</button>
                <p>Already a member ? please <Link to="/login">login</Link></p>
            </div>
        )
    }
}