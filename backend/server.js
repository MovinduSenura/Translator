const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
const path = require('path');

// MongoDB Connection
const { ConnectDB } = require("./utils/connection");

app.use(express.json());
app.use(bodyParser.json());

app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Apply CORS middleware to all routes
app.use(cors());

// Set up CORS configuration
// const corsOptions = {
//     origin: '*', // Replace with your frontend domain
// };

// // Specific CORS configuration for the PDF file endpoint
// app.get('/menu/generate-menu-invoice', cors(corsOptions), async (req, res) => {
//     // Your code to generate and serve the PDF file
// });

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`🚀 :: Server is up and running on PORT: ${PORT}`);
    ConnectDB();
});

// Routes
const savedTranslationsRoutes = require('./routes/savedTranslations.routes');
const translationHistoryRoutes = require('./routes/translationHistory.routes');

// API Middleware
app.use(savedTranslationsRoutes);
app.use(translationHistoryRoutes);
