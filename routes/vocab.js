const express = require("express");
const router = express.Router();
const Vocab = require("../models/Vocab");

router.get("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, login_type } =
      req.body;
    const data = await Vocab.find({});
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { word, mean } = req.body;
  try {
    if (word == null || mean == null) {
      res.status(200).send("data invalid");
    } else {
      const data = await Vocab.create({
        word: word,
        mean: mean,
        count: 0,
      });
      res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", async (req, res) => {
    try {
      const vocabId = req.params.id;
  
      const vocab = await Vocab.findById(vocabId);
  
      if (vocab) {
     
        vocab.count += 1;
        
        const updatedVocab = await vocab.save();
  
        res.json(updatedVocab);
      } else {
        res.status(404).json({ message: "คำศัพท์ไม่พบ" });
      }
    } catch (err) {
      console.error(err);
    }
  });

module.exports = router;
