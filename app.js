var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();
    

// app config 
mongoose.connect("mongodb://localhost:27017/restful_blogs_app", {
    useNewUrlParser: true
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.use(express.static("public"))

// Mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
})
var Blog = mongoose.model("blogs", blogSchema)


// RESTful routes
// Blog.create({
//     title: "Test blog",
//     image: "https://rukminim1.flixcart.com/image/612/612/juip0nk0/helmet/a/p/r/cliff-1-clf-k-58-full-face-vega-original-imaedhrvhhuzsfhz.jpeg?q=70",
//     body: "This is a test blog"
// })

app.get("/", (req, res) => {
    res.redirect("/blogs")
});

//INDEX route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});

//NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new")
});

// CREATE route
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, blog) => {
        if (err) {
            console.log(error)
        } else {
            res.redirect("/blogs")
        }
    })
});

// SHOW route
app.get("/blogs/:id", (req, res) => {
    Blog.findById( req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs")
        } else {
            res.render("show", { blog : blog });
        }
    });
});

// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById( req.params.id, (err, blog) => {
        if(err) {
            res.redirect("/blogs")
        } else {
            res.render("edit", { blog : blog });
        }
    });
});

// UPDATE route
app.put("/blogs/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if(err) {
            res.redirect("/blogs")
        } else{
            res.redirect("/blogs/"+ req.params.id)
        }
    })
});

// Destroy route
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(3000, () => {
    console.log("Serving at port 3000...")
});

