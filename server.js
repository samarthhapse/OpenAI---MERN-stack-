const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
// importing routes path
const authRoutes = require('./routes/authRoutes');

// dotenv for security
dotenv.config();
// mongo connection******************************************************
connectDB();

// rest object
const app = express ();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(errorHandler)
// API route ******************************************************
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

// listen server
const PORT = process.env.PORT || 8080;
app.listen(8080,()=>{
    console.log(`Server running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
})