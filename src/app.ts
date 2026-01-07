import express from 'express'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Server is alive and well :0")
})

export default app;