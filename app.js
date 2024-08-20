// les packages npm
const express = require("express");
const morgan = require("morgan");
const mongoose= require("mongoose");
const session = require('express-session')
// les modules natifs
const path = require("path");

// les modules locaux
const homeRoute = require("./routes");
const tweetRoutes = require("./routes/tweet.routes");
const connectRoutes = require('./routes/connect.route');
const mainRoutes = require('./routes/index');


// connexion a la bdd
require("./database");

// Déclarer et initier mon application
const app = express();
app.set("views", path.join(__dirname, "views")); // views se trouve dans 
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(session({
    secret:process.env.SESSION_SECRET || 'MonSecretLudo27122005', //de secret de session
    resave: false,
    saveUninitialized: true
}));
// Navigation et fonctionnement
app.use(mainRoutes);
app.use(homeRoute);
app.use('/tweet', tweetRoutes); // Montage des routes de tweets
app.use('/', connectRoutes);// M D R D connecion
app.listen(5000);
