const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

app.use(cors({
  origin: 'https://mauricehalsberghe.github.io/mytools',
  credentials: true
}));

// Redirect logged-in users from /login.html to /index.html
app.get('/login.html', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/index.html');
  }
  next(); // continue serving login.html
});

// Login handler
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

  if (users[username] && users[username].password === password) {
    req.session.user = username;
    res.redirect('/index.html');
  } else {
    res.status(401).send('Invalid login');
  }
});

// Serve user data only if logged in
app.get('/userdata', (req, res) => {
  if (!req.session.user) return res.status(403).send('Not logged in');

  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const userData = users[req.session.user].data;
  res.json(userData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
