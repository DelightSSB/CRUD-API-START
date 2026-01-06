import express from "express";
import tasks from "../data/tasks.js";
const router = express.Router();

//GET: Read all posts with optional limit query parameter
router.get("/", (req, res) => {
//   const completed =
    // req.query.completed === undefined
    //   ? undefined
    //   : req.query.completed === "true";
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


//GET: Read a specific post by ID
router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task){
        return res.status(404).json({error: 'Task with id ${id} not found'});
    }

    res.status(200).json(task);
});

//GET: Read a specific task by completion status
router.get('/:completed', (req, res, next) => {
    const status = req.params.completed === "true";
    const filteredTasks = tasks.filter(t => t.completed === status);
    const limit = Number(req.query.limit) || tasks.length;

    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(filteredTasks.slice(0, limit));
    }

    res.status(200).json(filteredTasks);

});

export default router;