"use strict";

const csvtojson = require("csvtojson");
const XLSX = require("xlsx");
const fs = require("fs")

module.exports = {
    up: async (queryInterface, Sequelize) => {

        //Active AHRI
        let numberOfActiveAhriFiles = 73;
        let concatenatedFixedActiveAhriFurnaceArray = [];
        for (let i = 1; i <= numberOfActiveAhriFiles; i++) {
            let path = "./import/ahri/furnace/active/" + i + ".xlsx";
            let workbook = XLSX.readFile(path);
            let sheet_name_list = workbook.SheetNames;
            let activeAhriFurnaceArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            let fixedActiveAhriFurnaceArray = activeAhriFurnaceArray.map((furnace) => {
                return {
                    id: parseInt(furnace["AHRI Certified Reference Number"]),
                    modelNumber: furnace["Model Number"],
                    brandSeriesModel: furnace["Brand Name"] + " | " + furnace["Series Name"] + " | " + furnace["Model Number"] + " (" + furnace["Model Status"] + ")",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            console.log("Extracted", fixedActiveAhriFurnaceArray.length.toLocaleString(), "furnaces from active AHRI file", path);
            concatenatedFixedActiveAhriFurnaceArray = [...concatenatedFixedActiveAhriFurnaceArray, ...fixedActiveAhriFurnaceArray];
        }
        console.log("Extracted", concatenatedFixedActiveAhriFurnaceArray.length.toLocaleString(), "total furnaces from", numberOfActiveAhriFiles, "active AHRI files");

        //Inactive AHRI
        let numberOfInactiveAhriFiles = 113;
        let concatenatedFixedInactiveAhriFurnaceArray = [];
        for (let i = 1; i <= numberOfInactiveAhriFiles; i++) {
            let path = "./import/ahri/furnace/inactive/" + i + ".xlsx";
            let fixedInactiveAhriFurnaceArray = [];
            if (fs.existsSync(path)) {
                let workbook = XLSX.readFile(path);
                let sheet_name_list = workbook.SheetNames;
                let inactiveAhriFurnaceArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                fixedInactiveAhriFurnaceArray = inactiveAhriFurnaceArray.map((furnace) => {
                    return {
                        id: parseInt(furnace["AHRI Certified Reference Number"]),
                        modelNumber: furnace["Model Number"],
                        brandSeriesModel: furnace["Brand Name"] + " | " + furnace["Series Name"] + " | " + furnace["Model Number"] + " (" + furnace["Model Status"] + ")",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });
            }
            console.log("Extracted", fixedInactiveAhriFurnaceArray.length.toLocaleString(), "furnaces from inactive AHRI file", path);
            concatenatedFixedInactiveAhriFurnaceArray = [...concatenatedFixedInactiveAhriFurnaceArray, ...fixedInactiveAhriFurnaceArray];
        }
        console.log("Extracted", concatenatedFixedInactiveAhriFurnaceArray.length.toLocaleString(), "total furnaces from", numberOfInactiveAhriFiles, "inactive AHRI files");

        /*
        //Energy Star
        const energyStarFurnaceArray = await csvtojson().fromFile("./import/energy_star/furnace.csv");
        let fixedEnergyStarFurnaceArray = energyStarFurnaceArray.map((furnace) => {
          return {
            id: parseInt(furnace["ENERGY STAR Unique ID"]),
            modelNumber: furnace["Model Number"],
            brandSeriesModel: furnace["Brand Name"] + " | " + furnace["Model Name"] + " | " + furnace["Model Number"],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        console.log("Extracted", fixedEnergyStarFurnaceArray.length.toLocaleString(), "furnaces from Energy Star file");
        */

        let itemArray = [...concatenatedFixedActiveAhriFurnaceArray, ...concatenatedFixedInactiveAhriFurnaceArray];

        return queryInterface.bulkInsert(
            "Items",
            itemArray,
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Items", null, {});
    }
};