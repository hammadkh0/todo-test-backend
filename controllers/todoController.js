const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.getAllTodos = async (req, res) => {
  try {
    const userTodos = req.user.todos;
    // get the todos present in user
    const allTodos = await Todo.find({ _id: { $in: userTodos } });

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
    // 1. get all todos from req.body
    const todosToSave = req.body.todos;
    // 2. get all the user's todos from db and filter out only their titles
    let userTodos = await req.user.populate("todos");
    userTodos = userTodos.todos.map((todo) => todo.title);
    // 3. filter out only the todos that are not in the user's todos
    const uniqueTodos = todosToSave.filter((todo) => !userTodos.includes(todo.title));
    // 4. if there are no new todos to save, return
    if (uniqueTodos.length === 0) {
      return res.status(200).json({ status: "fail", message: "No new todos to save" });
    }
    // 5. save the new todos to db
    const savedTodos = await Todo.insertMany(uniqueTodos);
    const user = req.user;
    // populate user with the new todos
    user.todos = [...user.todos, ...savedTodos];
    await user.save();
    res.status(201).json({ status: "success", savedTodos });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    // delete todo from db and return it.
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

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // update the todo fields
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : null;
    await todo.save();
    res.status(200).json({ status: "success", todo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
