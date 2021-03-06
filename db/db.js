const spicedPg = require("spiced-pg");

let db

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("../secrets.json")
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/social`)
}


// ADD USER
module.exports.addUser = (firstName, lastName, email, password) => {
    return db.query(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [firstName, lastName, email, password]
    )
}

// GET USER BY EMAIL
module.exports.getUserByEmail = (email) => {
    return db.query(`
        SELECT * FROM users
        WHERE email = $1`,
        [email]
    )
}

// GET USER BY ID
module.exports.getUserById = (id) => {
    return db.query(`
        SELECT * FROM users
        WHERE id = $1`,
        [id]
    )
}

// GET USERS BY ID
module.exports.getUsersById = (arrayOfId) => {
    return db.query(`
        SELECT id, first_name, last_name, profil_pic 
        FROM users 
        WHERE id = ANY($1)`, 
        [arrayOfId]
    )
}

// ADD PROFILE_PIC
module.exports.addProfilePic = (id, profilePic) => {
    return db.query(`
        UPDATE users
        SET profil_pic = $2
        WHERE id = $1
        RETURNING *`,
        [id, profilePic]
    )
}

// ADD BIO
module.exports.addBio = (id, bio) => {
    return db.query(`
        UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING *`,
        [id, bio] 
    )
}

// GET FRIENDS STATUS
module.exports.getFriendStatus = (senderID, recipientID) => {
    return db.query(`
        SELECT * FROM friends
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
        [senderID, recipientID]
    )
}

// ADD FRIENDS REQUEST
module.exports.addFriendRequest = (senderID, recipientID) => {
    return db.query(`
        INSERT INTO friends (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *`,
        [senderID, recipientID]
    )
}

// ACCEPT FRIENDS REQUEST
module.exports.acceptFriendRequest = (senderID, recipientID) => {
    return db.query(`
        UPDATE friends
        SET accepted = true
        WHERE sender_id = $1 AND recipient_id = $2`, 
        [senderID, recipientID]
    )
}

// DELETE FRIENDSHIP
module.exports.cancelFriendRequest = (senderID, recipientID) => {
    return db.query(`
        DELETE FROM friends
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`, 
        [senderID, recipientID]
    )
}

// GET ALL FRIENDS AND FRIENDS REQUEST
module.exports.getFriendsAndWanabee = (recipientID) => {
    return db.query(`
        SELECT users.id, first_name, last_name, profil_pic, accepted
        FROM friends
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [recipientID]
    )
}

// SEARCH FOR FRIENDS
module.exports.searchFriendByName = (text) => {
    return db.query(`
        SELECT first_name, last_name, id, profil_pic FROM users
        WHERE first_name LIKE $1`,
        [text]
    )
}

// GET LAST 10 MESSAGES
module.exports.getMessages = () => {
    return db.query(`
        SELECT messages.messages, messages.id, messages.created_at, users.first_name, users.last_name, users.profil_pic
        FROM messages
        JOIN users
        ON users.id = messages.sender_id
        ORDER BY messages.id DESC
        LIMIT 10
    `)
}

// ADD NEW MESSAGES
module.exports.addMessage = (id, message) => {
    return db.query(`
        INSERT INTO messages (sender_id, messages)
        VALUES ($1, $2)
        RETURNING *`,
        [id, message]
    )
}

// ADD WALL MESSAGE
module.exports.addWallPosts = (senderId, firstName, lastName, profilePic, message, picture) => {
    return db.query(`
        INSERT INTO wall (sender_id, first_name, last_name, profil_pic, messages, picture)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`, 
        [senderId, firstName, lastName, profilePic, message, picture ]
    )
}

// ADD WALL MESSAGE LINK
module.exports.addWallPostsLink = (senderId, firstName, lastName, profilePic, message, link, description, publisher, picture) => {
    return db.query(`
        INSERT INTO wall (sender_id, first_name, last_name, profil_pic, messages, link, descriptions, publisher, picture)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`, 
        [senderId, firstName, lastName, profilePic, message, link, description, publisher,  picture ]
    )
}
// GET WALL MESSAGES
module.exports.getWallPosts = () => {
    return db.query(`
        SELECT * FROM wall
        ORDER BY id DESC
        LIMIT 10
    `)
}