// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let bookModel = mongoose.Schema({
    date:String,
    duration:String,
    exercise:Number,
    intensity:String

},
{
    collection:"Bio_books"
}
)
module.exports = mongoose.model('Book',bookModel)