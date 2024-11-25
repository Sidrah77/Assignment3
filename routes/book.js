var express = require('express');
var router = express.Router();
let Book = require('../model/book')
const book = require('../model/book');
const bookController = require('../controllers/book.js');

/* Get route for the book list - Read Operation */
/*
GET, 
Post, 
Put --> Edit/Update
*/


//this function checks is the person is authenticated
function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return req.redirect('/login');
    }
    next();
}

/* Read operation --> Get route for displaying the books list*/


router.get('/',async(req,res,next)=>{
    try{
        const BookList = await Book.find();
        res.render('Book/list',{
            title:'Workout',
            BookList:BookList
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
})
/* Create operation --> Get route for displaying the Add Page */
router.get('/add', async(req, res,next) => {
    try {
        res.render('Book/add',{
            title: 'Add Book'
        });
    }
    catch(err)
    {
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/* Create Operation --> Post route for Processing the Add Page */
router.post('/add', async(req, res,next) => {
    try {
        /* change this up for the assignment or project */
        let newBook = Book({
            "date": req.body.date,
            "duration": req.body.duration,
            "exercise": req.body.exercise,
            "intensity": req.body.intensity
            
        });
        Book.create(newBook).then(()=> {
            res.redirect('/bookslist');
        })

    }
    catch(err)
    {
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/* Update operation --> Get route for displaying the Edit Page */
router.get('/edit/:id',async(req, res,next) => {
    try {

        const id = req.params.id;
        const bookToEdit = await Book.findById(id);
        res.render('Book/edit',
            {
                title: 'Edit Book',
                Book:bookToEdit
            }
        )

    }
    catch(err)
    {
        console.error(err)
        next(err); //passing the error
    }
});
/* Update Operation --> Post route for Processing the Edit Page */
router.post('/edit/:id',async(req, res,next) => {
    try {
        let id=req.params.id;
        let updatedBook = Book({
            "_id":id, 
            "date":req.body.date,
            "duration":req.body.duration,
            "exercise":req.body.exercise,
            "intensity":req.body.intensity
        })
        Book.findByIdAndUpdate(id, updatedBook).then(()=>{
            res.redirect('/bookslist')
        })
    }

    catch(err)
    {
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/* Delete Operation --> Get route to perform Delete operation */
router.get('/delete/:id',async(req, res, next) => {
    try{
        let id=req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/bookslist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
module.exports = router;
