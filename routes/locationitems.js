const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const db = require("../models");
const auth = require("./auth");

router
    .get("/", auth.required, asyncHandler(async (req, res) => {
        const locationitems = await db.LocationItem.findAll({
            include: [{
                model: db.User,
                as: "users",
                required: false,
                attributes: ["id", "firstName", "lastName", "email"],
                through: { attributes: [] }
            }]
        });
        return res.send(locationitems);
    }))
    .get("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let locationitem;
        if (Number.isInteger(id)) {
            locationitem = await db.LocationItem.findById(id, {
                include: [{
                    model: db.User,
                    as: "users",
                    required: false,
                    attributes: ["id", "firstName", "lastName", "email"],
                    through: { attributes: [] }
                }]
            });
        }
        if (locationitem) {
            return res.send(locationitem);
        } else {
            return res.status(400).send({ error: "LocationItem not found" });
        }
    }))
    .get("/placeId/:placeId", auth.required, asyncHandler(async (req, res) => {
        const placeId = req.params.placeId;
        const locationitem = await db.LocationItem.findOne({ where: { placeId: placeId } }, {
            include: [{
                model: db.User,
                as: "users",
                required: false,
                attributes: ["id", "firstName", "lastName", "email"],
                through: { attributes: [] }
            }]
        });
        if (locationitem) {
            return res.send(locationitem);
        } else {
            return res.send({ error: "LocationItem not found" });
        }
    }))
    .post("/", auth.required, asyncHandler(async (req, res) => {
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body;
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        const locationitem = await db.LocationItem.create({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(locationitem);
    }))
    .put("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body
        const locationitem = await db.LocationItem.findById(id);
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        await locationitem.update({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(locationitem);
    }))
    .delete("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id)
        const locationitem = await db.LocationItem.findById(id);
        await locationitem.destroy();
        return res.send({ id });
    }));

module.exports = router;