const express = require('express');
const router = express.Router();
const tweetRoutes = require('./tweet.routes');
const connectRoutes = require('./connect.route');

// Utiliser les routes pour les tweets
router.use('/tweets', tweetRoutes);

// Utiliser les routes pour les utilisateurs
router.use('/', connectRoutes);

// Route pour la page d'accueil
router.get('/', (req, res) => {
    if(req.session.username) {
        res.render('home', { user: { username: req.session.username } });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
