# CRUD-API-START

A simple RESTful CRUD API built with Node.js, Express, and TypeScript to practice backend fundamentals such as routing, middleware, validation, error handling, and request lifecycle management.
This project intentionally uses an in-memory data store instead of a database to focus on core API concepts.

## Tech Stack:
- Node.js
- Express
- TypeScript
- ESM Modules
- tsx dev runner

## Goals
- Understand RESTful API design
- Practice middleware handling and logic
- Handle input validation and custom error handling
- Practice TypeScript constraints

## Folder Structure
src/

-/app.ts            // Express app setup (middleware + routes)

-/server.ts         // Server entry point

-/routes/           // Route definitions

-/middleware/       // Validation, error handling, resource loaders

-/data/             // In-memory task data (fake DB)

-/types/            // Shared TypeScript types and extensions

-/errors/           // Custom error classes


## Tasks Structure
The stucture of each task in the in-mememory database is:
{
  id: number;
  name: string;
  completed: boolean;
}

## Routes Criteria
The POST, GET, PUT, and PATCH, routes all take in url encoded json data to complete the task. I recommend using POSTMAN to be able to change the body of 
your request to match the data that is necessary. You cannot change the id of a task but can change the name or string property of a task.  

## Routes:
- POST /api/posts
- GET (MANY) /api/posts  //Returns many tasks, can be filtered by name or completion status
- GET (ONE) /api/posts/:id  //Returns one tasks via id
- PUT /api/posts/:id  //Changes all properties of a task with the given id
- PATCH /api/posts/:id  //Changes only one property of a task with the given id
- DELETE /api/posts/:id  //Deletes task with the given id

## Example POST and DELETE Route:
POST - http://localhost:8000/api/posts
Body: 
name: "New Task"
completed: "true"

DELETE - http://localhost:8000/api/posts/2

## Error Handling and Validation
All user inputs will have their own custom error handling to ensure that inputs match the criteria of the "database" and its properties.
Remember the name value must be a string while the completed value must be a boolean of true or false

## Running the Project:
After pulling the repository:
Create your own .env file in the root of the repository.
Create a variable PORT and set it equal to whatever port you want to use on your machine. Ex, PORT=8000
run `npm install `
then run `npm run dev`
The server will start on the port defined in .env or run on port 8080 by default

## Extra info
- Data is stored in memory and resets on restart
- Designed for proof of learning and application of concepts. This is a foundational project into backend. Future projects will have extensive features and concepts applied to them as necessary. (controllers, limits, validation API, data persistence, etc.)
- Project is litered with comments providing tidbits of context and my thoughtprocess. They do not explain my entire logic on each of my routes
- Structure mirrors productio-grade Express applications




