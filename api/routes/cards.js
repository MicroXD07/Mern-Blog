const router = require("express").Router();
const User = require("../models/user");
const Card = require("../models/card");

//CREATE CARD
router.post("/", async (req, res) => {
  const newCard = new Card(req.body);
  try {
    const savedCard = await newCard.save();
    res.status(200).json(savedCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CARD
router.put("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (card.username === req.body.username) {
      try {
        const updatedCard = await Card.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCard);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your card!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CARD
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (card.username === req.body.username) {
      try {
        await card.delete();
        res.status(200).json("card has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your card!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CARD
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARDS
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let cards;
    if (username) {
      cards = await Card.find({ username });
    } else if (catName) {
      cards = await Card.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      cards = await Card.find();
    }
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
