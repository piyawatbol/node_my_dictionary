const express = require("express");
const router = express.Router();
const Vocab = require("../models/Vocab");

router.get("/", async (req, res) => {
  try {
    const data = await Vocab.find().sort({ word: 1 });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { word, mean } = req.body;
  try {
    if (word == null || mean == null || word == "" || mean == "") {
      res.status(200).send("data invalid");
    } else {
      const data = await Vocab.create({
        word: word,
        mean: mean,
        count: 0,
        remember: false,
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
      res.status(404).json({ message: "error update count" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;

    const vocab = await Vocab.findByIdAndDelete(vocabId);
    if (!vocab) {
      return res.status(401).send("delete error");
    }
    res.status(201).send({data : "delete success"});
  } catch (err) {
    console.error(err);
  }
});




module.exports = router;
