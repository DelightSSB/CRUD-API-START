import express from "express";
import tasks from "../data/tasks.js";
const router = express.Router();

//GET: Read all posts with optional limit query parameter
router.get('/', (req, res, next) => {
    const limit = Number(req.query.limit) || tasks.length;

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(tasks.slice(0, limit));
    }
    // TODO: Make Error middleware!
    //  else {
    //     res.status(400).json({error: "Invalid limit parameter"});
    // }

    res.status(200).json(tasks);
})

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
    const status = Boolean(req.params.completed);
    const filteredTasks = tasks.filter(t => t.completed === status);
    const limit = Number(req.query.limit) || tasks.length;

    if(!isNaN(limit) && limit > 0){
        res.status(200).json(filteredTasks.slice(0, limit));
    }

    res.status(200).json(filteredTasks);

});