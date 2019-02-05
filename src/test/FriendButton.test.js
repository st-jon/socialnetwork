import React from 'react'
import {shallow} from 'enzyme'

import axios from '../axios'
import FriendButton from '../components/FriendButton'


jest.mock('../axios') 

describe('TEST FOR GET ROUTE IN FRIENDBUTTON COMPONENT', () => {

    test('When FriendButton render, button status is Add Friend', async() => {

        const wrapper = shallow(<FriendButton />, {
            disableLifecycleMethods: true
        })
    
        axios.get.mockResolvedValue({
            data: {
               rows: [{}]    
            }
        })
    
        await wrapper.instance().componentDidMount()
    
        expect(
            wrapper.contains('Add Friend')).toBe(true)
    })
    
    test('When button Add Friend is click, button status is Accept Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })
    
        axios.get.mockResolvedValue({
            data: {
               rows: [{
                    accepted: false,
                    "sender_id": 1
               }]    
            }
        })
    
        await wrapper.instance().componentDidMount()
    
        expect(
            wrapper.contains('Accept Invitation')).toBe(true)
    })
    
    test('When button Add Friend is click, button status is Cancel Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })
    
        axios.get.mockResolvedValue({
            data: {
               rows: [{
                    accepted: false,
                    "recipient_id": 1
               }]    
            }
        })
    
        await wrapper.instance().componentDidMount()
    
        expect(
            wrapper.contains('Cancel Invitation')).toBe(true)
    })
    
    test('When button Accept or Cancel Friend is click, button status is Delete Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })
    
        axios.get.mockResolvedValue({
            data: {
               rows: [{
                    accepted: true
               }]    
            }
        })
    
        await wrapper.instance().componentDidMount()
    
        expect(
            wrapper.contains('Delete Friend')).toBe(true)
    })
})

describe ('TEST POST ROUTE IN FRIENDBUTTON COMPONENT', () => {
    
    test('When button Add Friend is click, button status is Delete Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })    
        axios.post.mockResolvedValue({
            data: {
               command: "INSERT"    
            }
        })
    
        await wrapper.instance().updateFriendStatus()
    
        expect(
            wrapper.contains('Cancel Invitation')).toBe(true)
    })

    test('When button Accept or Cancel Invitation is click, button status is Delete Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })    
        axios.post.mockResolvedValue({
            data: {
               command: "UPDATE" 
            }
        })
    
        await wrapper.instance().updateFriendStatus()
    
        expect(
            wrapper.contains('Delete Friend')).toBe(true)
    })

    test('When button Delete Friend is click, button status is Add Friend', async() => {

        const wrapper = shallow(<FriendButton otherUserID={1}/>, {
            disableLifecycleMethods: true
        })    
        axios.post.mockResolvedValue({
            data: {
               command: "DELETE" 
            }
        })
    
        await wrapper.instance().updateFriendStatus()
    
        expect(
            wrapper.contains('Add Friend')).toBe(true)
    })
})