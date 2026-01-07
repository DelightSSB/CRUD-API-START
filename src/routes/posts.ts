import express from "express";
import { HttpError } from "../middleware/HttpError.js";
import tasks from "../data/tasks.js";
const router = express.Router();

//POST: Create a new task
router.post("/",(req, res, next) => {
  console.log(req.body)
  const{name , completed} = req.body;
  console.log(name , completed)
  console.log(typeof name, typeof completed)

  if(name === "" || completed === ""){ //check if user entered both field
    const error = new HttpError(`Enter a valid tasks with name and completion status`, 400)
    return next(error)
  }else   if ( //check that completed field is in fact true or false
  typeof completed === "string" &&
  completed.toLowerCase() !== "true" &&
  completed.toLowerCase() !== "false"
){
    const error = new HttpError(`Completion property must be true or false`, 400);
    return next(error)
}
  else{ //Convert completed into a boolean and create newTask 
    const convertedCompletion = typeof completed === "string"
    ? completed.toLowerCase() === "true"
    : completed;

    const newTask = {
      id: tasks.length+1, //filler id, a database will assign it's own id
      name: name,
      completed: convertedCompletion
    }

    tasks.push(newTask);
    res.status(201).json(tasks);
  }


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


//GET: Read a specific post by ID
router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if(!task){
        // return res.status(404).json({error: 'Task with id ${id} not found'});
        // const error = new Error(`Task with id ${id} not found`);
        // (error as any).status =  404;
        const error = new HttpError(`Task with id ${id} was not found`, 404);
        return next(error)
    }

    res.status(200).json(task);
});



export default router;