import React from 'react'
import axios from '../axios.js'
import { Link } from 'react-router-dom'


export default class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
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
            if (data.success) {
                location.replace('/')
            } else {
                this.setState({
                    error: true
                })
            }
        })
    }
    render() {
        return (
            <div className="form__registration">
                {this.state.error && <div className="error">Ooops!</div>}
                <input className="input__registration" type="text" name="firstName" onChange={this.handleChange} autoComplete="off" placeholder="first name" autoFocus/>
                <input className="input__registration" type="text" name="lastName" onChange={this.handleChange} autoComplete="off" placeholder="last name" />
                <input className="input__registration" type="text" name="email" onChange={this.handleChange} autoComplete="off" placeholder="email" />
                <input className="input__registration" type="password" name="password" onChange={this.handleChange} autoComplete="off" placeholder="password" />
                <button className="btn__registration" onClick={this.submit}>REGISTER</button>
                <p>Already a member ? please <Link className="link" to="/login">login</Link></p>
            </div>
        )
    }
}