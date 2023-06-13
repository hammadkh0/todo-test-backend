const Todo = require("../models/todoModel");
const User = require("../models/userModel");

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
    const user = req.user;
    // populate user with todos
    user.todos = [...user.todos, newTodo];
    await user.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.saveAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.insertMany(req.body);
    const user = req.user;
    // populate user with todos
    user.todos = [...user.todos, ...allTodos];
    await user.save();
    res.status(201).json({ status: "success", allTodos });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);
    const user = req.user;
    // remove todo from user
    user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);
    await user.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
