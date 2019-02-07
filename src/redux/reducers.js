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
    return state
}