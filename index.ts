import express from 'express';
import cors from 'cors';
import { food } from './routers/index';

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());


// the user defined routers 
app.use('/food', food);


app.listen(PORT, () => { console.log('The server is now running on port ', PORT); });