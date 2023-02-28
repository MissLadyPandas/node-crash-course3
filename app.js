const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');

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

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });    
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

app.get('/single-blog', (req, res) => {
    Blog.findById('663fd5eced384ebbe707e62b4')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})


// app.use ((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method:', req.method);
//     next();
// });

// app.use ((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });

// res.send('<p>home page</p>');
app.get('/', (req, res,) => {
    res.redirect('/blogs');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
    //     {title: 'Mario finds stars', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
    //     {title: 'How to defeat Bowser', snippet: 'lorem  iseds sdf ert sdfsf asdffg'},
    // ]
    // res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result } )
    })
    .catch((err) => {
        console.log(err);
    })
});

app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});