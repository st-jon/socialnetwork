import * as io from 'socket.io-client'
import {getOnlineUsers, UpdateOnlineUsers, deleteOnlineUser} from './redux/actions'


let socket

export function initSocket(store) {
    if(!socket) {
        socket = io.connect()

        socket.on('users online', users => {
            store.dispatch(getOnlineUsers(users.onlineUsers))
        })

        socket.on('new user', users => {
            store.dispatch(UpdateOnlineUsers(users.newUser[0]))
        })

        socket.on('user left', users => {
            store.dispatch(deleteOnlineUser(users.id))
        })
    }
}