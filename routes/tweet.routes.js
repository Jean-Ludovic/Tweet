const router = require('express').Router();
const Tweet = require('../database/tweet.model');

// Lister tous les tweets
router.get('/', (request, response, next) => {
    Tweet.find({}).sort({ _id: -1 }).then((documents) => {
        response.render('tweets/tweet-list', { tweets: documents });
    }).catch((err) => {
        next(err);
    });
});

// Afficher le formulaire pour un nouveau tweet
router.get('/new', (request, response) => {
    
    response.render('tweets/tweet-form');
});

// Créer un nouveau tweet
router.post('/create', (req, res) => {
    if (!req.session.username) { 
      
        return res.redirect('/login'); // Rediriger si l'utilisateur n'est pas connecté
    
    }

    const newTweet = new Tweet({
        content: req.body.content,
        username: req.session.username, // Utiliser le username de la session
        url: req.body.url
    });

    newTweet.save().then(() => {
        res.redirect('/tweet'); // Rediriger après la création du tweet
    }).catch((err) => {
        // Gérer l'erreur
    });
});

    


module.exports = router;
