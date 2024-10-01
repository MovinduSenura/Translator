const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

//MongoDB Connection
const { ConnectDB } = require("./utils/connection");

app.use(express.json());
app.use(bodyParser.json());

// Apply CORS middleware to all routes
app.use(cors());

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`🚀 :: Server is up and running on PORT: ${PORT}`);
    ConnectDB();
})

//routes
const savedTranslationsRoutes = require('./routes/savedTranslations.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const userRoutes = require('./routes/user.routes');//user


//API Middleware
app.use(savedTranslationsRoutes);
app.use(feedbackRoutes);
app.use(userRoutes);//user