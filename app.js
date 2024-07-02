// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// CREATE EXPRESS APP
// Here you should create your Express app:
const app = express();


// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));


// ROUTES
// Start defining your routes here:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'home.html'));
  });
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'blog.html'));
  });

// Serve JSON data for projects
const projects = require('./data/projects.json');
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Serve JSON data for articles
const articles = require('./data/articles.json');
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// Catch-all route to serve 404 page
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'views', 'not-found.html'));
});

// START THE SERVER
// Make your Express server listen on port 5005:
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});