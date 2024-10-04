const Admin = require("../models/admin.model");

//add new admin details
const createAdmin = async (req, res) => {
  console.log("Received admin data :", req.body);

  const newAdmin = new Admin(req.body);

  try {
    await newAdmin.save();

    res.status(201).json({ message: "Admin Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin Creation Failed" });
  }
};

//retrieve all the admin details
const getAllAdmin = async (req, res) => {
  const allAdmins = await Admin.find();

  try {
    if (!allAdmins) {
      res.status(404).json({ message: "No Any Admin Details" });
    }

    res.status(200).json({
      message: "Admin Details Fetched Successfully",
      data: allAdmins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin Details Fetching Failed!" });
  }
};

//Fetch Admin Details by id
const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      res.status(404).json({ message: "Couldnt Find the Admin" });
    }

    res.status(200).json({
      message: "Admin Data Fetched Successfully",
      data: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin's Data Fetching Failed" });
  }
};

//Update admin by id
const updateAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateAdmin) {
      res.status(404).json({ message: "Couldnt Find the Admin" });
    }

    res.status(200).json({
      message: "Admin Data Successfully Updated",
      data: updateAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admins's Data Updating Failed" });
  }
};

//Delete admin by id
const deleteAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAdmin = await Admin.findByIdAndDelete(id);

    if (!deleteAdmin) {
      res.status(404).json({ message: "Couldnt Find the Contract" });
    }

    res.status(200).json({
      message: "Admin Data Successfully Deleted",
      data: deleteAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin's Data Deleting Failed" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
