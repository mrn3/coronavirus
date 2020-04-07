const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const db = require("../models");
const auth = require("./auth");

router
    .get("/", auth.required, asyncHandler(async (req, res) => {
        const locations = await db.Location.findAll({
            include: [{
                model: db.User,
                as: "users",
                required: false,
                attributes: ["id", "firstName", "lastName", "email"],
                through: { attributes: [] }
            }]
        });
        return res.send(locations);
    }))
    .get("/nearby", auth.optional, asyncHandler(async (req, res) => {
        let locations = await db.Location.findAll({
            where: db.Sequelize.where(
                db.Sequelize.fn('ST_DWithin',
                    db.Sequelize.col('position'),
                    db.Sequelize.fn('ST_SetSRID',
                        db.Sequelize.fn('ST_MakePoint',
                            req.query.long, req.query.lat),
                        4326),
                    0.032),     //within 2 miles
                true)
            });
        return res.send(locations);
    }))
    .get("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let location;
        if (Number.isInteger(id)) {
            location = await db.Location.findById(id, {
                include: [{
                    model: db.User,
                    as: "users",
                    required: false,
                    attributes: ["id", "firstName", "lastName", "email"],
                    through: { attributes: [] }
                }]
            });
        }
        if (location) {
            return res.send(location);
        } else {
            return res.status(400).send({ error: "Location not found" });
        }
    }))
    .get("/placeId/:placeId", auth.required, asyncHandler(async (req, res) => {
        const placeId = req.params.placeId;
        const location = await db.Location.findOne({ where: { placeId: placeId } }, {
            include: [{
                model: db.User,
                as: "users",
                required: false,
                attributes: ["id", "firstName", "lastName", "email"],
                through: { attributes: [] }
            }]
        });
        if (location) {
            return res.send(location);
        } else {
            return res.send({ error: "Location not found" });
        }
    }))
    .post("/", auth.required, asyncHandler(async (req, res) => {
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body;
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        const location = await db.Location.create({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(location);
    }))
    /*
    .post("/placeId/:placeId", auth.required, asyncHandler(async (req, res) => {
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body;
        const location = await db.Location.upsert({ placeId, formattedAddress, addressComponents, lat, lng });
        return res.send(location);
    }))
    */
    .put("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body
        const location = await db.Location.findById(id);
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        await location.update({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(location);
    }))
    .delete("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id)
        const location = await db.Location.findById(id);
        await location.destroy();
        return res.send({ id });
    }));

module.exports = router;