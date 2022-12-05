require('dotenv').config();



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const PassportLocalSchema = require("mongoose").PassportLocalSchema;
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/googleKeepReplicaDB");

// const auth = require("./routes/auth");
// const notes = require("./routes/notes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use("/api/auth", auth);
// app.use("/api/notes", notes);



const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  notes: [{
      title: String,
      content: String
  }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});







/*
  HandelingAPI Authentication HTTP Requests
*/


app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/auth", (req, res) => {
    res.send("<h1>This is the Authentication API Page for Keeper App</h1>");
});

app.post("/api/auth/register", (req, res) => {


    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.send({ username: req.body.username, loginStatus: false });
        } else {
            passport.authenticate("local")(req, res, function () {
                console.log("Successful");
                res.send({ username: req.body.username, loginStatus: true });
            });
        }
    });
});

app.post("/api/auth/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
            res.send({ username: user.username, loginStatus: false });
        } else {
            passport.authenticate("local")(req, res, function () {
                console.log("Found User");
                res.send({ username: user.username, loginStatus: true });
            });
        }
    });
});









/*
  Handleing API Notes HTTP Requests
*/

app.post("/api/notes", (req, res) => {
  
  const username = req.body.username;
  console.log(username);

  User.findOne({username}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.notes);
    }
  });

});


app.post("/api/notes/add", (req, res) => {
  const username = req.body.username;
  const note = req.body.note;

  

  User.updateOne({username}, {$push: {notes: note}}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Added Note");
      User.findOne({username, notes: {$elemMatch: {title: note.title, content: note.content}}}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result._id);
        }
      })
    }
  });
}); 



app.post("/api/notes/remove", (req, res) => {
  const username = req.body.username;
  const _id = req.body._id;

  User.updateOne({username}, {$pull: {notes: {_id}}}, (err) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      console.log("Successfully Deleted Note");
      res.send(true);
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
