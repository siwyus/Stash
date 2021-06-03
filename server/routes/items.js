const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// import UserSchema
const Item = require("../models/Item");

// @route       GET api/items
// @desc        Get all items
// @access      Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ item: req.item }).sort({
      created_date: -1
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route       POST api/item
// @desc        Add new item
// @access      Public
router.post(
  "/",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, date_created, amount, consumption_time, ends_in, prize, where_to_buy } = req.body;

    try {

      const newItem = new Item({ name, category, date_created, amount, consumption_time, ends_in, prize, where_to_buy });

      item = await newItem.save();

      res.json(item);
    } catch (err) {
      console.error(err.messsage);
      res.status(500).send(err.message);
    }
  }
);

// @route       PUT api/item/:id
// @desc        Update item
// @access      Public
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  // Build item object

  const itemFields = {};
  if (name) itemFields.name = name;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found." });

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send(err.message);
  }
});

// @route       DELETE api/item/:id
// @desc        Delete item
// @access      Public
router.delete("/:id", async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found." });

    await Item.findByIdAndRemove(req.params.id);
    res.json({ msg: "Item removed. " });
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send(err.message);
  }
});

module.exports = router;
