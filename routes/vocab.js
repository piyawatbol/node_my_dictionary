const express = require("express");
const router = express.Router();
const Vocab = require('../models/Vocab')


router.get('/',async(req,res) => {
    try{
        const data = await Vocab.find({})
        res.status(200).send(data)
    }catch(err){
        console.log(err);
    }
})


router.post('/',async(req,res) => {
    try{
        const data = await Vocab.create({
            word: "ant",
            mean: "มด",
            count: 0,
        })
        res.status(200).send(data)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;