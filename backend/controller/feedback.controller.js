const Feedback = require("../models/feedback.model");

//add new feedback details
const createfeedback = async (req, res) => {
  console.log("Received feedback data :", req.body);

  const newFeedback = new Feedback(req.body);

  try {
    await newFeedback.save();
    res.status(201).json({ message: "Feedback Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Creation Failed" });
  }
};

//retrieve all the feedback details
const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    if (allFeedback.length === 0) {
      return res.status(404).json({ message: "No Any Feedback Details" });
    }

    res.status(200).json({
      message: "Feedback Details Fetched Successfully",
      data: allFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Details Fetching Failed!" });
  }
};

//Fetch Feedback Details by id
const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Couldn't Find the Feedback" });
    }

    res.status(200).json({
      message: "Feedback Data Fetched Successfully",
      data: feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Data Fetching Failed" });
  }
};

//Update admin by id
const updateFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const updateFeedback = await Feedback.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateFeedback) {
      return res.status(404).json({ message: "Couldn't Find the Feedback" });
    }

    res.status(200).json({
      message: "Feedback Data Successfully Updated",
      data: updateFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Data Updating Failed" });
  }
};

//Delete Feedback by id
const deleteFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteFeedback = await Feedback.findByIdAndDelete(id);
    if (!deleteFeedback) {
      return res.status(404).json({ message: "Couldn't Find the Feedback" });
    }

    res.status(200).json({
      message: "Feedback Data Successfully Deleted",
      data: deleteFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Feedback Data Deleting Failed" });
  }
};



module.exports = {
  createfeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  getAllFeedback,
};
