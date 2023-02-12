import express from 'express';
import routes from './routes/index.js';
import morgan from 'morgan'
const app = express();
import DBconnect from './server/connect.js';
app.use(express.json());


app.use(morgan(':method::url'));
routes(app);
DBconnect();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})

export default app;