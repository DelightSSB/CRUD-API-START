import express from "express";
import { HttpError } from "../middleware/httperror.js";
import isValid from "../middleware/validateInput.js";
import selectedTask from "../middleware/selectedTask.js";
import tasks from "../data/tasks.js";
const router = express.Router();

//POST: Create a new task
router.post("/", isValid, (req, res, next) => {

    const newTask = {
      id: tasks.length+1, //filler id, a database will assign it's own id
      name: req.body.name,
      completed: req.body.completed
    }

    tasks.push(newTask);
    res.status(201).json(tasks);


});

//GET: Read all posts with optional limit query parameter
router.get("/", (req, res, next) => {

  const completedQuery = req.query.completed;
  if (
  completedQuery !== undefined &&
  typeof completedQuery === "string" &&
  completedQuery.toLowerCase() !== "true" &&
  completedQuery.toLowerCase() !== "false"
) {
    const error = new HttpError(`Your query for completion must ask for true or false`, 404);
    return next(error)
}

    const completed =
        typeof req.query.completed === "string"
    ? req.query.completed.toLowerCase() === "true"
    : undefined;
  const limit = Number(req.query.limit) || tasks.length;

  let results = tasks;

  if (completed !== undefined) {
    results = results.filter(p => p.completed === completed);
  }

  res.status(200).json(results.slice(0, limit));
});


//GET: Read a specific post by ID, the middleware does everything for this one
router.get('/:id', selectedTask, (req, res, next) => {
    res.status(200).json(req.task);
});

//PUT: Change all properties of a task, exluding the id property
router.put('/:id',selectedTask, isValid, (req, res, next,) => {
  req.task.name = req.body.name
  req.task.completed = req.body.completed
  res.json(tasks)
})



export default router;