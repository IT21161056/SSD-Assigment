const express = require("express");
const router = express.Router();
const {
  addItem,
  deleteItem,
  getAllItem,
  getItemById,
} = require("../Controller/LibraryItemController");
const {
  validateAddLibraryItem,
  getLibraryItemByIdValidator,
  deleteLibraryItemByIdValidator,
  validateAndSanitize,
} = require("../validators/libraryItemValidator");

router.get("/", getAllItem);
router.get(
  "/:id",
  getLibraryItemByIdValidator,
  validateAndSanitize,
  getItemById
);
router.post("/add", validateAddLibraryItem, validateAndSanitize, addItem);
router.delete(
  "/:id",
  deleteLibraryItemByIdValidator,
  validateAndSanitize,
  deleteItem
);

module.exports = router;
