const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const db = require("../models");
const auth = require("./auth");

router
    .get("/", auth.required, asyncHandler(async (req, res) => {
        const items = await db.Item.findAll({
            include: [{
                model: db.User,
                as: "users",
                required: false,
                attributes: ["id", "firstName", "lastName", "email"],
                through: { attributes: [] }
            }]
        });
        return res.send(items);
    }))
    .get("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let item;
        if (Number.isInteger(id)) {
            item = await db.Item.findById(id, {
                include: [{
                    model: db.User,
                    as: "users",
                    required: false,
                    attributes: ["id", "firstName", "lastName", "email"],
                    through: { attributes: [] }
                }]
            });
        }
        if (item) {
            return res.send(item);
        } else {
            return res.status(400).send({ error: "Item not found" });
        }
    }))
    .get("/brandSeriesModel/:searchTerm", auth.required, asyncHandler(async (req, res) => {
        const { searchTerm } = req.params;
        let wordArray = searchTerm.split(" ");
        let whereClause = {
            limit: 100,
            where: {
                [db.Sequelize.Op.and]: []
            }
        };
        for (const word of wordArray) {
            whereClause.where[db.Sequelize.Op.and].push({
                brandSeriesModel:
                {
                    [db.Sequelize.Op.iLike]: "%" + word + "%"
                }
            });
        }
        const item = await db.Item.findAll(whereClause);

        if (item) {
            return res.send(item);
        } else {
            return res.send({ error: "Item not found" });
        }
    }))
    .post("/", auth.required, asyncHandler(async (req, res) => {
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body;
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        const item = await db.Item.create({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(item);
    }))
    .put("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const { placeId, formattedAddress, addressComponents, lat, lng } = req.body
        const item = await db.Item.findById(id);
        let position = {
            type: "Point",
            coordinates: [lng, lat],
            crs: { type: "name", properties: { name: "EPSG:4326" } }
        }
        await item.update({ placeId, formattedAddress, addressComponents, lat, lng, position });
        return res.send(item);
    }))
    .delete("/:id", auth.required, asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id)
        const item = await db.Item.findById(id);
        await item.destroy();
        return res.send({ id });
    }));

module.exports = router;