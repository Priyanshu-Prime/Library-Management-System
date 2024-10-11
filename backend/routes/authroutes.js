const express = require("express");
// const passport = require("../config/googleAuth");
const {googleLogin} = require("../controllers/authcontrol");
const router = express.Router();

router.post("/auth/google-login", googleLogin);

// router.get("/google/",
//     passport.authenticate('google', {scope: ['profile', 'email']})
// );

// router.get('/google/callback/', 
//     passport.authenticate('google', {failureRedirect: '/login'  }),
//     (req, res) =>
//     {
//         const token = req.user.token;s
//         res.redirect(`/dashboard?token=${token}`);
//     }
// );

module.exports = router;