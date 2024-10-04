const expresss = require("express");
const passport = require("../config/googleAuth");
const router = express.Router();

router.get("/auth/google/",
    passport.authenticate('google', {scope: ['profile', 'email']})
);

router.get('/auth/google/callback/', 
    passport.authenticate('google', {failureRedirect: '/login'  }),
    (req, res) =>
    {
        const token = req.user.token;
        res.redirect(`/dashboard?token=${token}`);
    }
);

module.exports = router;