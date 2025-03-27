const Store = require("../models/Store");

// Add Item
const AddItem = async (req, res) => {
  try {
    const { ItemID,ItemName,ItemDes, ItemPrice, message } = req.body;
    const newItem = new Store({ ItemID, ItemName, ItemDes, ItemPrice, message });

    await newItem.save();
    res.status(201).json({ message: "Item Added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Items  (For Admin Panel)
const getAllItems = async (req, res) => {
  try {
    const Items = await Store.find().sort({ createdAt: -1 });
    res.json(Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { AddItem, getAllItems };
