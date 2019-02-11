const bodyParser = require('body-parser')
const compression = require('compression')
const cookieSession = require('cookie-session')
const csurf = require('csurf')
const express = require('express')

const {cookieSecret} = require("./secrets.json")
const {getUserById, getUsersById} = require('./db/db')
const routes = require('./routes')

const app = new express()

const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: 'localhost:8080', pingTimeout: 60000})

app.use(compression())

app.use(bodyParser.json())

const cookieSessionMiddleware = cookieSession({
    secret: cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14
})
app.use(cookieSessionMiddleware)
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next)
})

app.use(express.static('./public'))

app.use(csurf())

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken())
    next()
})

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`))
}

app.use('/', routes)

server.listen(8080, function() {
    console.log("Server listen on port 8080")
})

let onlineUsers = {}

io.on('connection', (socket) => {
    console.log('server connected to socket', socket.id)

    onlineUsers[socket.id] = socket.request.session.userID

    let usersID = [... new Set(Object.values(onlineUsers))]

    getUsersById(usersID)
        .then(data => {
            socket.emit('users online', {
                onlineUsers: data.rows
            })
            socket.broadcast.emit('new user', {
                newUser: data.rows.filter(user => {
                    return user.id === socket.request.session.userID
                })
            })
        })
        .catch(err => console.log(err.message))

    socket.on('disconnect', () => {
        let userToDelete =  onlineUsers[socket.id]
        delete onlineUsers[socket.id]

        io.sockets.emit('user left', {
            id: userToDelete
        })
    })
})

