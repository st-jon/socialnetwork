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