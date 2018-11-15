/* Used: https://mherman.org/blog/local-authentication-with-passport-and-express-4/ */
/* db: https://mlab.com/databases/codingcoach */

const path = require('path');
const fetch = require('node-fetch');
const ROUTES = require('./../constants/routes.constant');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const passport = require('passport')

const User = require('../models/user-model')

/* const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
 */




module.exports = function (app) {
    // database
    mongoose.connect(keys.mongodb.dbURI, () => {
        console.log('connected to mongodb');
    });

    // app
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'), { user : req.user });
    });

    const LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
            });
    }
    ));

    // use static authenticate method of model in LocalStrategy
    passport.use(new LocalStrategy(User.authenticate()));

    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/logout', function (req, res) {
        /* NOT WORKING */
        req.logout();
        res.sendFile(path.resolve(__dirname, './../../index.html'));
    });

    app.get('/login', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'), { user : req.user });
    });

    app.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
    });

    app.get('/profile', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'), { user: req.user });
    });

    app.get('/register', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'), { });
    });

    app.post('/register', function(req, res) {
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                return res.render('register', { user : user });
            }
    
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

    app.get('/ping', function(req, res){
        res.status(200).send("pong!");
    });


    

    /* app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    }));

    app.use('/auth', authRoutes);
    app.use('/profile', profileRoutes); */

    /* const fakeDatabase = {
        id: 1,
        email: 'bob@bob.bob',
        password: 'password',
        username: 'bob'
    }

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connected')
    });

    app.get('/users', (req, res) => {
        const allUsernames = Object.keys(fakeDatabase)
        console.log('/users is running!' + allUsernames)
        res.send('have a good day')
    })

    Necessary to move session data out of memory into an external session store?
    app.use(
        session(
          {
            store: redisStore(),
          },
          app,
        ),
      ); 
    
    // auth routing
    const router = require('express').Router(); 


    router
        .post('/login', ctx => passport.authenticate('local', (err, user) => {
            if (!user) {
            ctx.throw(401, err);
            } else {
            ctx.body = user;
            return ctx.login(user);
            }
        })(ctx))
        .get('/users/profile', auth.getLoggedUser)
        .get('/logout', (ctx) => {
            ctx.logout();
            ctx.body = {};
        })

    app.use(router.routes()).use(router.allowedMethods()); */ 

    app.get('/about', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'));
    });

    app.get('/resize', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'));
    });

    app.get('/visibility', function (req, res) {
        res.sendFile(path.resolve(__dirname, './../../index.html'));
    });

    app.get('/favicon.ico', function (req, res) {
        res.writeHead(204, {
            'Content-Type': 'image/x-icon',
            'Cache-Control': 'public, max-age: 604800'
        });

        res.end();
    });

    app.get('/weather/:queryExpression', function (req, res) {
        fetch(`${ROUTES.WEATHER_BASE_URL}weather?${req.params.queryExpression}`)
            .then(response => response.json())
            .then(json => { res.send(json) })
            .catch(() => { res.send(JSON.stringify({message: 'System Error'})) });
    });

    app.get('/weather_list/:queryExpression', function (req, res) {
        fetch(`${ROUTES.WEATHER_BASE_URL}find?${req.params.queryExpression}`)
            .then(response => response.json())
            .then(json => { res.send(json) })
            .catch(() => { res.send(JSON.stringify({message: 'System Error'})) });
    });

    app.get('/location/:queryExpression', function (req, res) {
        fetch(ROUTES.GOOGLE_GEOCODE(req.params.queryExpression))
            .then(response => response.json())
            .then(json => { res.send(json) })
            .catch(() => { res.send(JSON.stringify({message: 'System Error'})) });
    });
};
