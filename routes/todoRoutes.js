const express = require("express");
const {
  getAllTodos,
  createTodo,
  saveAllTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const { protect } = require("../controllers/userController");

const router = express.Router();

router.use(protect);
router.get("/", getAllTodos);
router.post("/", createTodo);
router.post("/saveAll", saveAllTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
module.exports = router;
