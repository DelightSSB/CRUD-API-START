import express from "express";
import { HttpError } from "../middleware/httperror.js";
import isValid from "../middleware/isValid.js";
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

//GET: Read all posts with optional completed query parameter
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

//PUT: Update all properties of a task, excluding the id property
router.put('/:id',selectedTask, isValid, (req, res, next,) => {
  req.task.name = req.body.name
  req.task.completed = req.body.completed
  res.json(tasks)
});

//PATCH: Update only one property of a given task, excluding the id property
router.patch('/:id', selectedTask, ( req, res, next) => {
  const { name, completed } = req.body ?? {};

  const hasName = req.body.name !== undefined;
  const hasCompleted = req.body.completed !== undefined;

  if (hasName === hasCompleted) {
    const error = new HttpError("Enter exclusively either 'name' or 'completed'. Not both.", 400);
    return next(error)
  }

  if (hasName && typeof name === "string" && name.trim() === "") {
    const error = new HttpError("Task name cannot be set to blank", 400);
    return next(error)
  }

  if(hasName){
    req.task.name = req.body.name
  }else if (
      typeof completed === "string" &&
      completed.toLowerCase() !== "true" &&
      completed.toLowerCase() !== "false"
    ){
        const error = new HttpError(`Completion property must be true or false`, 400);
        return next(error)
    }else{
    req.task.completed = typeof completed === "string"
    ? completed.toLowerCase() === "true"
    : completed;
  }
  res.json(tasks)
});

//DELETE: Delete the task whos id matches with the one given. Then send the updated tasks.
router.delete('/:id', selectedTask, ( req, res, next) => {
  const index = tasks.findIndex(task => task.id === req.task.id);
  tasks.splice(index, 1);
  res.json(tasks)
});


export default router;