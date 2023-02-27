const express = require('express');

//express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item

app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname })
});