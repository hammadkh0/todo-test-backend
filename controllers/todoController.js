const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
