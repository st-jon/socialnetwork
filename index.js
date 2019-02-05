const bodyParser = require('body-parser')
const compression = require('compression')
const cookieSession = require('cookie-session')
const csurf = require('csurf')
const express = require('express')

const {cookieSecret} = require("./secrets.json")
const routes = require('./routes')

const app = new express()

app.use(compression())

app.use(bodyParser.json())

app.use(cookieSession({
    secret: cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}))

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

app.listen(8080, function() {
    console.log("I'm listening.")
})


