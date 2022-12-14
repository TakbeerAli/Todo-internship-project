import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors());

app.get('/', (req,res)=>{
    res.send("hello ");
})
app.use('/tasks', taskRoutes);
app.use('/users',userRoutes);



const CONNECTION_URL = 'mongodb+srv://takbeer:OLlR0mjTQs6WfXHE@todos.siwxpt5.mongodb.net/?retryWrites=true&w=majority';
const PORT =  5000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);