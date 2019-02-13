import React from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(e) {
        this[e.target.name] = e.target.value
    }

    submit() {
        axios.post('/login', {
            email: this.email,
            password: this.password
        })
            .then(({data}) => {
                if (data.success) {
                    location.replace('/')
                } else {
                    this.setState({
                        error: true
                    });
                }
            }).
            catch(err => console.log(err.message))
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    render() {
        return (
            <div onKeyPress={this.handleKeyPress} className="form__login">
                {this.state.error && <div className="error">Ooops!</div>}
                <input className="input__login" type="text" name="email" onChange={this.handleChange} autoComplete="off" placeholder="email" autoFocus />
                <input className="input__login" type="password" name="password" onChange={this.handleChange} autoComplete="off" placeholder="password" />
                <button className="btn__login" onClick={this.submit}>LOGIN</button>
                <p>Not yet registered ? <Link to="/">register</Link></p>
            </div>
        )
    }
}