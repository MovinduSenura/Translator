const translationHistoryModel = require("../models/translationHistory.model");
const pdfCreator = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

// Input translations (handles multiple translations)
const inputTranslation = async (req, res) => {
  const { username, translationHistory } = req.body; // Expecting an array of translations

  try {
    // Validate that username and translationHistory are present
    if (
      !username ||
      !translationHistory ||
      !Array.isArray(translationHistory) ||
      translationHistory.length === 0
    ) {
      return res
        .status(400)
        .send({
          message:
            "Username and a non-empty array of translations are required.",
        });
    }

    // Validate that each translation object contains both english and sinhala
    for (const translation of translationHistory) {
      if (!translation.english || !translation.sinhala) {
        return res
          .status(400)
          .send({
            message:
              "Each translation must have both English and Sinhala fields.",
          });
      }
    }

    // Find the user's translation history
    let userHistory = await translationHistoryModel.findOne({ username });

    if (!userHistory) {
      // If no history exists, create a new record
      userHistory = new translationHistoryModel({
        username,
        translationHistory,
      });
    } else {
      // If history exists, add the new translations to the history array
      userHistory.translationHistory.push(...translationHistory);
    }

    // Save the updated history
    const savedTranslationHistory = await userHistory.save();
    res
      .status(200)
      .send({
        message: "Translations saved successfully!",
        data: savedTranslationHistory,
      });
  } catch (err) {
    console.error("Translation input error:", err.message);
    res
      .status(500)
      .send({ message: "An error occurred while saving translations." });
  }
};

// Get all translations for a user
const getAllTranslations = async (req, res) => {
  const { username } = req.params;

  try {
    const history = await translationHistoryModel.findOne({ username });

    if (!history) {
      return res
        .status(404)
        .json({
          status: false,
          message: "No translation history found for the user.",
        });
    }

    return res
      .status(200)
      .json({ status: true, data: history.translationHistory });
  } catch (error) {
    console.error("Error fetching translation history:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};

// Generate PDF report for user's translation history
const generateHistoryReport = async (req, res) => {
    const { username } = req.params;
  
    try {
      // Read the HTML template for the PDF
      const htmlTemplate = fs.readFileSync(
        path.join(__dirname, "../template/historyReportTemplate.html"),
        "utf-8"
      );
      
      const timestamp = moment().format("YYYY_MMMM_DD_HH_mm_ss");
      const filename = `Translation_History_Report_${timestamp}_doc.pdf`;
  
      // Fetch the user's translation history
      const userHistory = await translationHistoryModel.findOne({ username });
  
      if (!userHistory) {
        return res.status(404).send({
          status: false,
          message: "No translation history found for the user.",
        });
      }
  
      // Prepare data for the PDF
      const wordsArray = userHistory.translationHistory.map((translation) => ({
        english: translation.english,
        sinhala: translation.sinhala,
        createdAt: moment(translation.createdAt).format('YYYY-MM-DD HH:mm:ss'), // Format the createdAt date
      }));
  
      // Define PDF options
      const options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: { height: "0mm" },
        footer: { height: "0mm" },
        zoomFactor: "1.0",
        type: "buffer",
      };
  
      // Create the document structure for the PDF
      const document = {
        html: htmlTemplate,
        data: { wordsArray },
        path: `./docs/${filename}`, // Save path for the generated PDF
      };
  
      // Generate the PDF
      await pdfCreator.create(document, options);
      const filepath = `http://localhost:8000/docs/${filename}`; // Link to access the PDF
  
      res.status(200).json({ filepath });
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  

module.exports = {
  inputTranslation,
  getAllTranslations,
  generateHistoryReport,
};
