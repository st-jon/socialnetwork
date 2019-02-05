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
        [senderID, recipientID])
}

// ADD FRIENDS REQUEST
module.exports.addFriendRequest = (senderID, RecipientID) => {
    return db.query(`
        INSERT INTO friends (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *`,
        [senderID, RecipientID])
}

// ACCEPT FRIENDS REQUEST
module.exports.acceptFriendRequest = (senderID, RecipientID) => {
    return db.query(`
        UPDATE friends
        SET accepted = true
        WHERE sender_id = $1 AND recipient_id = $2`, 
        [senderID, RecipientID])
}

// DELETE FRIENDSHIP
module.exports.cancelFriendRequest = (senderID, RecipientID) => {
    return db.query(`
        DELETE FROM friends
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`, 
    [senderID, RecipientID])
}