const express = require('express')
const path = require('path')
const multer = require('multer')
const uidSafe = require('uid-safe')

const app = express()

const {addUser, getUserByEmail, getUserById, addProfilePic, addBio} = require('./db/db')
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


// ROUTES


app.get('/welcome', (req, res) => {
    if (req.session.userID) {
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

app.get('/user', (req, res) => {
    getUserById(req.session.userID)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.post('/upload', uploader.single('file'), upload, (req, res) => {
    let url = `${s3Url}${req.file.filename}` 
    addProfilePic(req.session.userID, url)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.post('/edit/bio', (req, res) => {
    addBio(req.session.userID, req.body.bio)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.get('/api/user/:id', (req, res) => {
    if(req.session.userID == req.params.id) {
        res.json({
            redirectTo: '/'
        })
    } else {
        getUserById(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err.message)
            res.json({
                redirectTo: '/'
            })
        })
    } 
})

app.post('/register', (req, res) => {
    hashPassword(req.body.password)
        .then(hash => {
            return addUser(req.body.firstName, req.body.lastName, req.body.email, hash);
        })
        .then(({rows}) => {
            req.session.userID = rows[0].id
            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err.message)
            res.json({})
        })
})

app.post('/login', (req, res) => {
    getUserByEmail(req.body.email)
        .then(({rows}) => {
            req.session.userID = rows[0].id
            return checkPassword(req.body.password, rows[0].password)
        })
        .then(bool => {
            if(bool === true) {
                res.json({
                    success: true
                })
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

app.get('*', function(req, res) {
    if (!req.session.userID) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

module.exports = app