const express = require('express');
const app = express();
const cors = require('cors');
const nocache = require('nocache');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();





app.use(cors());
app.use(cors(
    {
        origin: [`http://localhost:5173`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        optionsSuccessStatus: 204,
    }
))

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }));

app.use('/', userRoutes);
connectDB();
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Runnig on ${port}`);
})