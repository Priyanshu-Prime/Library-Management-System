const passport = require("passport");
const GoogleStrategy = require("passport-google-ouath20");
const jwt = require("jsonwebtoken");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } = process.env;

passport.use(
    new GoogleStrategy(
        {
            cliendID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) =>
        {
            try
            {
                const email = profile.emails[0].value;

                const domain = email.split('@')[1];
                if (domain != 'iiitt.ac.in')
                {
                    return done(null, false, {message: 'Not an Institute mail'});
                }
                let user = await findOrCreateUser(profile);

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                    },
                    JWT_SECRET, {expiresIn: '1h'},
                );
                done(null, {token});
            }
            catch(err)
            {
                done(err, false);
            }
        }
    )
);

passport.serializeUser((user, done) =>
{
    done(null, user);
});

passport.deserializeUser((user, done) =>
{
    done(null, user);
});

module.exports = passport;