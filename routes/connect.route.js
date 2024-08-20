const router = require("express").Router();
const User = require("../database/user.model");

// Route pour la page d'accueil
router.get('/', (request, response, next) => {
    response.render("home");
});

// Route pour la page de connexion
router.get('/login', (request, response, next) => {
    response.render("includes/login");
});

// Route pour la page d'inscription
router.get('/signin', (request, response, next) => {
    response.render("includes/signin");
});

// Traitement de la connexion utilisateur
router.post("/connecter", (request, response, next) => {
  
    const body = request.body;
    User.findOne({ email: body.email })
        .exec()
        .then((document) => {
            if (document && document.password === body.password) {
                // Ajo le prénom de l'utilisateur dans la session sous 'username'
                request.session.username = document.prenom; 

                // Redirige l'utilisateur vers la page d'accueil avec la session maintenant configurée
                alert("Vous pouvez tweetez maintenant");
                response.redirect("/");
            } else {
                // Si les informations d'identification sont incorrectes, renvoyez l'utilisateur au formulaire de connexion
                response.render("includes/login", {
                    errors: ["L'adresse e-mail ou le mot de passe est incorrect!"],
                });
            }
        })
        .catch((err) => {
            //  les erreurs de validation ou autres erreurs ici
            const errorsKeys = Object.keys(err.errors || {});
            const mesErreurs = [];
            errorsKeys.forEach((key) => {
                mesErreurs.push(err.errors[key].message);
            });
            response.render("includes/login", { errors: mesErreurs });
        });
});


// Traitement de l'enregistrement utilisateur
router.post("/enregistrer", (request, response, next) => {

    const newUser = new User(request.body);
    newUser
        .save()
        .then((document) => {
            response.redirect("/login");
        })
        .catch((err) => {
            const errorsKeys = Object.keys(err.errors);
            const mesErreurs = [];
            errorsKeys.forEach((key) => {
                mesErreurs.push(err.errors[key].message);
            });
            response.render("includes/signin", { errors: mesErreurs });
        });
});

module.exports = router;
