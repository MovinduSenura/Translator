const Word = require("../models/wordslist.models");
const pdfCreator = require('pdf-creator-node');
const fs = require('fs'); //Use Node.js's fs module to delete the file from the filesystem.
const path = require('path');
const moment = require("moment"); //Use for format date and time

//add new word 
const createWord = async (req, res) => {
  console.log("Received Word :", req.body);

  const newWord = new Word(req.body);

  try {
    await newWord.save();

    res.status(201).json({ message: "New Word Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "New Word Creation Failed" });
  }
};

//retrieve all words
const getAllWords = async (req, res) => {
  const allWords = await Word.find();

  try {
    if (!allWords) {
      res.status(404).json({ message: "No Any Words" });
    }

    res.status(200).json({
      message: "Word Fetched Successfully",
      data: allWords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Words Fetching Failed!" });
  }
};

//Fetch Word by id
const getWordById = async (req, res) => {
  const { id } = req.params;

  try {
    const word = await Word.findById(id);

    if (!word) {
      res.status(404).json({ message: "Couldnt Find the Word" });
    }

    res.status(200).json({
      message: "Word Fetched Successfully",
      data: word,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Word Fetching Failed" });
  }
};

//Update Word by id
const updateWordById = async (req, res) => {
  const { id } = req.params;

  try {
    const updateWord = await Word.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateWord) {
      res.status(404).json({ message: "Couldnt Find the Word" });
    }

    res.status(200).json({
      message: "Word Successfully Updated",
      data: updateWord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Word Updating Failed" });
  }
};

//Delete word by id
const deleteWordById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteWord = await Word.findByIdAndDelete(id);

    if (!deleteWord) {
      res.status(404).json({ message: "Couldnt Find the Word" });
    }

    res.status(200).json({
      message: "Word Successfully Deleted",
      data: deleteWord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Word Deleting Failed" });
  }
};

const generateWordListReport = async (req, res) => {
  try {
      // Read the HTML template for the invoice
      const htmlTemplate = fs.readFileSync(path.join(__dirname, '../template/wordlist.html'), 'utf-8');

      // Generate a timestamp for the filename
      const timestamp = moment().format('YYYY_MMMM_DD_HH_mm_ss');
      const filename = `Words_List_${timestamp}_doc.pdf`;

      // Fetch all items from the database
      const words = await Word.find({});

      // Initialize an array to hold the transformed items
      let wordlistArray = [];

      // Transform each item and add it to the array
      words.forEach(i => {
     

          const trwo = {
            englishWord: i.englishWord,
            sinhalaWord: i.sinhalaWord,
          };

          // Push the transformed item into the array
          wordlistArray.push(trwo);
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
            wordlistArray,
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
  createWord,
  getAllWords,
  getWordById,
  updateWordById,
  deleteWordById,
  generateWordListReport,
};
