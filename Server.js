if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require("express-flash")
const session = require("express-session")
const path = require("path")
const methodOverride = require("method-override")

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)     
)

const users = []

//app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
// app.use(express.static('html'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/Public"))
app.use(express.static(__dirname + "/views"))
// app.engine('.html', require('ejs').__express);

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.get('/', function(req, res){
    res.render("Index")
});

app.get('/home', checkAuthenticated, function(req, res){
    res.render('Home')
})


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('Sign-in');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect: "/login",
    failureFlash: true, 

}))
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('Register');
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push ({
            id: Date.now().toString(),
            name: req.body.user,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect("/register")
    }
    console.log(users)
})

app.delete("/logout", (req, res) => {
    req.logOut()
    res.redirect('/login')
})
app.get('/about', function(req, res){
    res.render('About')
})
app.get('/adopt', checkAuthenticated, function(req, res){
    res.render('Adopt')
})
app.get('/birds', checkAuthenticated, function(req, res){
    res.render('Birds')
})
app.get('/cats', checkAuthenticated, function(req, res){
    res.render('Cats')
})
app.get('/dogs', checkAuthenticated, function(req, res){
    res.render('Dogs')
})
app.get('/profile', checkAuthenticated, function(req, res){
    res.render('Profile')
})

app.get('*', (req, res) => {
    res.render("404")
});

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/home")
    }
    next()
}

app.listen(8080, function(){
    console.log("Server stated");
    console.log("Listening....");
});