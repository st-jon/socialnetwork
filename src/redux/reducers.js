export default function(state = {}, action) {

    if (action.type === 'RECEIVE_FRIENDS') {
        state = {...state, friends: action.friends}
    }

    if (action.type === 'DELETE_FRIEND') {
        state = {
            ...state,
            friends: state.friends.filter(friend => {
                return friend.id !== action.id
            })
        }
    }

    if (action.type === 'ADD_FRIEND') {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id === action.id) {
                    return {...friend, accepted: true}
                } else {
                    return friend
                }
            })
        }
    }

    if (action.type === 'GET_ONLINE_USERS') {
        state = {...state, onlineUsers: action.onlineUsers}
    }

    if (action.type === 'UPDATE_ONLINE_USERS') {
        state = {
            ...state, 
            onlineUsers: [...state.onlineUsers, action.newOnlineUsers]
        }
    }

    if (action.type === 'DELETE_ONLINE_USER') {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => {
                return user.id !== action.id
            })      
        }
    }

    if (action.type === 'GET_MESSAGES') {
        state = {
            ...state,
            messages: action.messages
        }
    }

    if (action.type === 'ADD_MESSAGE') {
        state = {
            ...state,
            messages: [...state.messages, action.message]
        }
    }

    if (action.type === 'GET_WALL_POSTS') {
        state = {
            ...state,
            posts: action.posts
        }
    }

    if (action.type === 'ADD_WALL_POST') {
        state.posts.unshift(action.post)
        state = {
            ...state,
            posts: [...state.posts]
        }
    }

    return state
}