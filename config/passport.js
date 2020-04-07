const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require("../models");

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
            const user = await db.User.findOne({ where: { email: email } });
            let validPassword = await user.validatePassword(password);
            if (!user || !validPassword) {
                return done(null, false, { message: "Incorrect email or password" });
            }
            return done(null, user, { message: "Logged In Successfully" });
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret"
    },
    async (jwtPayload, done) => {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            const user = await db.User.findByPk(jwtPayload.id);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));