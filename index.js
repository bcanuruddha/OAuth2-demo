const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('./src/auth');

const app = express();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/ui/login.html'));
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'openid', 'profile', 'https://www.googleapis.com/auth/drive'] }  
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`
    <div style= "width: 40%; margin: 10% 30%; background-color: #C0C0C0; padding: 50px;">
      <h2 style= "text-align: center; color: green">Authentication Success</h2>
      <img src="${req.user.picture}" width="50" height="60" style={margin:auto}>
      <h3>You Loged in as: ${req.user.displayName}</h3>
      <h3>Email: ${req.user.email}</h3>
    </div>`
    );
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

app.listen(3000, () => console.log('listening on port: 3000'));
