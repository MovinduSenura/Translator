const Word = require("../models/wordslist.models");

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

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  updateWordById,
  deleteWordById,
};
