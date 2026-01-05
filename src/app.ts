import express from 'express'
const app = express();

app.get("/", (req, res) => {
    res.send("Server is alive and well :0")
})

export default app;