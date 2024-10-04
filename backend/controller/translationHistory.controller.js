const translationHistoryModel = require("../models/translationHistory.model");
const pdfCreator = require('pdf-creator-node');
const fs = require('fs'); //Use Node.js's fs module to delete the file from the filesystem.
const path = require('path');
const moment = require("moment"); //Use for format date and time

const inputTranslation = async (req, res) => {
    const { translation } = req.body;

    try {
        if (!translation || !translation.english || !translation.sinhala) {
            return res.status(400).send({ message: "Both English and Sinhala translations are required" });
        }

        const newTranslation = new translationHistoryModel({
            english: translation.english,
            sinhala: translation.sinhala,
        });

        const savedTranslation = await newTranslation.save();
        res.status(200).send({ message: "Translation saved successfully!", data: savedTranslation });
    } catch (err) {
        console.error("Translation input error:", err.message);
        res.status(500).send({ message: "An error occurred while inputting translation." });
    }
}

const getAllTranslations = async (req, res) => {
    try {
        const allTranslations = await translationHistoryModel.find();
        res.status(200).send({
            status: true,
            message: "✨ :: All translations are fetched",
            AllTranslations: allTranslations,
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

const generateHistoryReport = async (req, res) => {
    try {
        // Read the HTML template for the invoice
        const htmlTemplate = fs.readFileSync(path.join(__dirname, '../template/historyReportTemplate.html'), 'utf-8');

        // Generate a timestamp for the filename
        const timestamp = moment().format('YYYY_MMMM_DD_HH_mm_ss');
        const filename = `Translation_History_Report_${timestamp}_doc.pdf`;

        // Fetch all items from the database
        const words = await translationHistoryModel.find({});

        // Initialize an array to hold the transformed items
        let wordsArray = [];

        // Transform each item and add it to the array
        words.forEach(i => {
            // Convert menuItemAvailability from true/false to "Yes"/"No"
            // const menuItemAvailability = i.menuItemAvailability ? "Yes" : "No";

            const trwo = {
                english: i.english,
                sinhala: i.sinhala,
            };

            // Push the transformed item into the array
            wordsArray.push(trwo);
        });

        // Calculate the logo path and load the logo image asynchronously
        // const logoPath = path.join(__dirname, '../template/images/logo.png');
        // const logoBuffer = await fs.promises.readFile(logoPath);
        // Encode the logo buffer to base64
        // const logoBase64 = logoBuffer.toString('base64');

        // Set the PDF options
        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            header: {
                height: '0mm',
            },
            footer: {
                height: '0mm',
            },
            zoomFactor: '1.0',
            type: 'buffer',
        };

        // Create the document object with the HTML template, data, and file path
        const document = {
            html: htmlTemplate,
            data: {
                wordsArray,
                // logoBuffer: logoBase64,
            },
            path: `./docs/${filename}`,
        };

        // Generate the PDF and save it to the specified path
        const pdfBuffer = await pdfCreator.create(document, options);

        // Build the file path URL for the response
        const filepath = `http://localhost:8000/docs/${filename}`;

        // Send the file path in the response
        res.status(200).json({ filepath });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    inputTranslation,
    getAllTranslations,
    generateHistoryReport,
}
