import express from 'express';
import detenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// configure file .env
detenv.config();

// config database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//middle ware
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')))  

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoute)

app.get('*',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const port = process.env.PORT 

app.listen(port,(req,resp)=>{
    console.log(`Server is Runing port ${port}`);
});