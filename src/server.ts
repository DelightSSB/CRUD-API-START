import 'dotenv/config';
import app from './app.js';
import post from './routes/taskRoutes.js';
import errorHandler from './middleware/error.js';

const port = process.env.PORT || 8080
// import {post} from './routes/index.js';

// Routes
app.use('/api/posts', post);

//Error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})