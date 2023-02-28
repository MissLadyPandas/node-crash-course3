const express = require('express');

//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.use ((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method:', req.method);
    next();
});

app.use ((req, res, next) => {
    console.log('in the next middleware');
    next();
});

// res.send('<p>home page</p>');
app.get('/', (req, res,) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
        {title: 'Mario finds stars', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
        {title: 'How to defeat Bowser', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
    ]
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});