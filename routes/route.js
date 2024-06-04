const express = require('express');
const Object = require("../models/model");

const router = express.Router();

router.get("/", async (req,res) => {
        try {
            const cafes = await Object.find();
            res.render("home", {
                title : "Cafe Rating",
                data : cafes
            });
        }
        catch(error) {
            console.log("Error while getting values from database");
        }
    });

router.post("/add", async (req,res) => {
    try {
        const cafe = new Object({
            name : req.body.name,
            phone : req.body.phone,
            ratingSum : 0,
            ratingCount : 0
        });
        await cafe.save();
        req.session.message = {
            type : "success",
            info : "You have added a new cafe sucessfully"
        }
        res.redirect("/");
    } 
    catch {
        console.log("Error while adding a new cafe");

    }
});


//Adding new cafe
router.get("/add", (req,res) => {
    res.render("add_cafe", {
        title:"Add a new cafe"
    });
});
    

//Rating the cafe
router.get("/rate/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const cafe = await Object.findById(id);
        res.render("rate_cafe", {
            title: "Rate Cafe",
            cafe : cafe
        });
    }
    catch(err) {
        console.log("Some error occured while getting the data");
    }
});

router.post("/rate/:id", async (req,res) => {
    const id = req.params.id;
    const rating = parseInt(req.body.rating);
    try {
        const cafe = await Object.findById(id);
        const newSum = parseInt(cafe.ratingSum + rating);
        const newCount = parseInt(cafe.ratingCount + 1); 
        await Object.findByIdAndUpdate(id, {
            ratingSum : newSum,
            ratingCount : newCount  
        });
        req.session.message = {
            type : "success",
            info : "You have rated sucessfully"
        }
        res.redirect("/");
    }
    catch(err) {
        console.log("Some error occured while getting the data");
    }
});

module.exports = router;
