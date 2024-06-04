const express = require("express");
const dotenv = require("dotenv").config();
const db = require('./config/dbConnectionConfig');
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = process.env.port;

db();

//Middlewares
app.use(
    session({
        secret : "my secret key",
        saveUninitialized : true,
        resave: false,
    })
);
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", require("./routes/route"));

app.set("view engine","ejs");


app.listen(port, () => {
    console.log("App is live on port " + port);
});