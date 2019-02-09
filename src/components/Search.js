import React from 'react'
import axios from '../axios'
import ProfilePic from './ProfilePic'

import {Link} from 'react-router-dom'

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchedFriends: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetSearch = this.resetSearch.bind(this)
    }

    handleChange(e) {
        this[e.target.name] = e.target.value
        axios.get(`/search/${this.searchbar}`)
            .then(data => {
                this.setState({
                    searchedFriends: data.data.rows
                })
            })
            .catch(err => console.log(err.message))
    }

    resetSearch() {
        this.setState({
            searchedFriends: []
        })
        document.querySelector('.searchBar').value = ""
    }

    render() {
        return (
            <div className="search__container">
                <input type="text" name="searchbar" className="searchBar" onChange={this.handleChange} autoComplete="off" placeholder="Search Friends" autoFocus/>
                <div className="result__container">
                    {this.state.searchedFriends &&
                    this.state.searchedFriends.map(friend => {
                        return (
                            <Link to={`/user/${friend.id}`} key={friend.id}>
                                <div onClick={this.resetSearch} className="result">
                                    <ProfilePic 
                                        picture={friend['profil_pic']}
                                        name={friend['first_name']}
                                        last={friend['last_name']}
                                    />
                                    <div className="result__name" >
                                        {friend['first_name']}  {friend['last_name']} 
                                    </div>
                                </div>    
                            </Link>
                        )  
                    })}    
                </div>
            </div>
        )
    }
}