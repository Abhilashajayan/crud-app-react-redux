const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const nocache = require('nocache');
const connectDB = require('./config/database');

connectDB();

app.use(cors());
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))