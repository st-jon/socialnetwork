import axios from '../axios';

export async function receiveFriends() {
    const {data} = await axios.get('/getfriends')
    return {
        type: 'RECEIVE_FRIENDS',
        friends: data.data.rows
    };
}

export const deleteFriend = async (id) => {
    const {data} = await axios.post('/status/update', {
        status: 'Delete Friend',
        otherID: id
    })
    return {
        type: 'DELETE_FRIEND',
        data,
        id
    }
}

export const addFriend = async(id) => {
    const {data} = await axios.post('/status/update', {
        status: 'Accept Invitation',
        otherID: id
    })
    return {
        type: 'ADD_FRIEND',
        data,
        id
    }
}

export const getOnlineUsers = (onlineUsers) => {
    return {
        type: 'GET_ONLINE_USERS',
        onlineUsers
    }
}

export const UpdateOnlineUsers = (newOnlineUsers) => {
    return {
        type: 'UPDATE_ONLINE_USERS',
        newOnlineUsers
    }
}

export const deleteOnlineUser = (id) => {
    return {
        type: 'DELETE_ONLINE_USER',
        id
    }
}

export const getMessages = (messages) => {
    return {
        type: 'GET_MESSAGES',
        messages
    }
}

export const addMessage = (message) => {
    return {
        type: 'ADD_MESSAGE',
        message
    }
}