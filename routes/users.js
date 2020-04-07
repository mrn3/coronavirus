const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler")
const db = require("../models");
const passport = require("passport");
const auth = require("./auth");

router
    .get("/", auth.required, asyncHandler(async (req, res) => {
        const users = await db.User.findAll({
            include: [{
                model: db.Location,
                as: "locations",
                required: false,
                attributes: ["id", "placeId", "formattedAddress", "lat", "lng"],
                through: { attributes: [] }
            }]
        });
        return res.send(users);
    }))
    /*.get("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let user;
        if (Number.isInteger(id)) {
            user = await db.User.findByPk(id, {
                include: [{
                    model: db.Location,
                    as: "locations",
                    required: false,
                    attributes: ["id", "placeId", "formattedAddress", "lat", "lng"],
                    through: { attributes: [] }
                }]
            });
        }
        if (user) {
            return res.send(user);
        } else {
            return res.status(400).send({ error: "User not found" });
        }
    }))
    */
    .get("/email/:email", auth.optional, asyncHandler(async (req, res) => {
        const email = req.params.email;
        const user = await db.User.findOne({ where: { email: email } })
        if (user) {
            return res.send(user);
        } else {
            return res.send({ error: "User not found" });
        }
    }))
    //get current logged in user (required, only authenticated users have access)
    .get("/me", auth.required, asyncHandler(async (req, res) => {
        const { payload: { id } } = req;
        const user = await db.User.findByPk(id);

        if (!user) {
            return res.sendStatus(400);
        }
        return res.json(user.toAuthJSON());
    }))
    .get('/logout', auth.required, asyncHandler(async (req, res) => {
        req.logout();
        return res.status(200).json({
            status: "success"
        });
    }))
    //create user
    .post("/", auth.optional, asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        if (!email) {
            return res.status(422).json({
                errors: {
                    email: "is required"
                },
            });
        }
        if (!password) {
            return res.status(422).json({
                errors: {
                    password: "is required",
                },
            });
        }
        const user = await db.User.create({ firstName, lastName, email, password });
        const userWithToken = user.toAuthJSON();
        return res.send(userWithToken);
    }))
    //login route
    .post("/login", auth.optional, asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email) {
            return res.status(422).json({
                errors: {
                    email: "is required"
                },
            });
        }
        if (!password) {
            return res.status(422).json({
                errors: {
                    password: "is required",
                },
            });
        }
        return passport.authenticate(
            "local",
            { session: false },
            (err, user, info) => {
                if (err || !user) {
                    return res.json({
                        message: 'Something is not right',
                        user   : user
                    });
                }
                req.login(user, {session: false}, (err) => {
                   if (err) {
                       res.send(err);
                   }
                   user.token = user.generateJWT();
                   return res.json(user.toAuthJSON());
                });
            }
        )(req, res, next);
    }))
    .put("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email } = req.body
        const user = await db.User.findByPk(id);
        await user.update({ firstName, lastName, email });
        return res.send(user);
    }))
    .delete("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id)
        const user = await db.User.findByPk(id);
        await user.destroy();
        return res.send({ id });
    }));

module.exports = router;