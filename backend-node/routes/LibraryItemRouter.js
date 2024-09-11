const express = require("express");
const router = express.Router();
const {
  addItem,
  deleteItem,
  getAllItem,
  getItemById,
} = require("../Controller/LibraryItemController");

router.get("/", getAllItem);
router.get("/:id", getItemById);
router.post("/add", addItem);
router.delete("/:id", deleteItem);

module.exports = router;
