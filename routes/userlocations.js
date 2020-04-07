const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const db = require("../models");
const auth = require("./auth");

router
    .get("/", auth.required, asyncHandler(async (req, res) => {
        const userlocations = await db.UserLocation.findAll();
        return res.send(userlocations);
    }))
    .get("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let userlocation;
        if (Number.isInteger(id)) {
            userlocation = await db.UserLocation.findById(id);
        }
        if (userlocation) {
            return res.send(userlocation);
        } else {
            return res.status(400).send({ error: "UserLocation not found" });
        }
    }))
    .post("/", auth.required, asyncHandler(async (req, res) => {
        const { userId, locationId } = req.body;
        const userlocation = await db.UserLocation.create({ userId, locationId });
        return res.send(userlocation);
    }))
    .put("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const { userId, locationId } = req.body
        const userlocation = await db.UserLocation.findById(id);
        await userlocation.update({ userId, locationId });
        return res.send(userlocation);
    }))
    .delete("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id)
        const userlocation = await db.UserLocation.findById(id);
        await userlocation.destroy();
        return res.send({ id });
    }));

module.exports = router;