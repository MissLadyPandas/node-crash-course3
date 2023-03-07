const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
// const Blog = require('./models/blog');  <== removed and added to blogRoutes.js
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI ='mongodb+srv://kbrumback:test1234@cluster0.kpdgknd.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    // .then((result) => console.log('connected to db'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    res.render('about', { title: 'About' });
});

//blog routes
app.use(blogRoutes);

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});