const express = require('express')
const path = require('path')
const multer = require('multer')
const uidSafe = require('uid-safe')

const app = express()

const {addUser, getUserByEmail, getUserById, addProfilePic, addBio, getFriendStatus, addFriendRequest, acceptFriendRequest, cancelFriendRequest, getFriendsAndWanabee} = require('./db/db')
const {hashPassword, checkPassword} = require('./utils/crypt')
const {upload} = require('./s3')
const {s3Url} = require('./config') 

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads')
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname))
      })
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
})


// FIRST WELCOME PAGE 
app.get('/welcome', (req, res) => {
    if (req.session.userID) {
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

// GET USER BY ID
app.get('/user', (req, res) => {
    getUserById(req.session.userID)
        .then(data => res.json(data))
        .catch(err => console.log(err.message))
})

// UPLOAD PROFILE PICTURE
app.post('/upload', uploader.single('file'), upload, (req, res) => {
    let url = `${s3Url}${req.file.filename}` 
    addProfilePic(req.session.userID, url)
        .then(data => res.json(data))
        .catch(err => console.log(err.message))
})

// EDIT USER BIO
app.post('/edit/bio', (req, res) => {
    addBio(req.session.userID, req.body.bio)
        .then(data => res.json(data))
        .catch(err => console.log(err.message))
})

// NAVIGATE TO OTHER PROFILE
app.get('/api/user/:id', (req, res) => {
    if(req.session.userID == req.params.id) {
        res.json({ redirectTo: '/'})
    } else {
        getUserById(req.params.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err.message)
            res.json({redirectTo: '/'})
        })
    } 
})

// GET FRIEND STATUS
app.get('/status/:id', (req, res) => {
    getFriendStatus(req.session.userID, req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err.message))
})

// UPDATE FRIEND STATUS
app.post('/status/update', (req, res) => {
    if (req.body.status === 'Add Friend') {
        addFriendRequest(req.session.userID, req.body.otherID)
            .then(data => res.json(data))
            .catch(err => console.log(err.message))
    }
    else if (req.body.status === 'Accept Invitation') {
        acceptFriendRequest(req.body.otherID, req.session.userID)
            .then(data => res.json(data))
            .catch(err => console.log(err.message))
    }
    else if (req.body.status === 'Cancel Invitation' || 'Delete Friend') {
        cancelFriendRequest(req.session.userID, req.body.otherID)
            .then(data => res.json(data))
            .catch(err => console.log(err.message))
    }
})

// GET FRIENDS AND WANABEE
app.get('/getfriends', (req, res) => {
    getFriendsAndWanabee(req.session.userID)
        .then(data => res.json({data}))
        .catch(err => console.log(err.message))
})

// SEND REGISTRATION
app.post('/register', (req, res) => {
    hashPassword(req.body.password)
        .then(hash => {
            return addUser(req.body.firstName, req.body.lastName, req.body.email, hash);
        })
        .then(({rows}) => {
            req.session.userID = rows[0].id
            res.json({success: true })
        })
        .catch(err => {
            console.log(err.message)
            res.json({})
        })
})

// LOGIN
app.post('/login', (req, res) => {
    getUserByEmail(req.body.email)
        .then(({rows}) => {
            req.session.userID = rows[0].id
            return checkPassword(req.body.password, rows[0].password)
        })
        .then(bool => {
            if(bool === true) {
                res.json({success: true})
            } else {
                req.session.userID = null
                res.json({})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.json({})
        })
})

// LOGOUT
app.get('/logout', (req, res) => {
    req.session.userID = null
    res.redirect('/welcome#/')
})

// ALL OTHER ROUTES
app.get('*', function(req, res) {
    if (!req.session.userID) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

module.exports = app