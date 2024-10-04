const Admin = require("../models/admin.model");
const nodemailer = require('nodemailer');

// Email sending setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'translatortest95@gmail.com', // Your email address
    pass: 'vgvb wdto jcuv swyp',       // Your email password (Note: Use an app-specific password if 2FA is enabled)
  },
});

// Add new admin details
const createAdmin = async (req, res) => {
  console.log("Received admin data:", req.body);

  const newAdmin = new Admin(req.body);

  try {
    await newAdmin.save();

    // Send email to new admin
    const mailOptions = {
      from: 'translatortest95@gmail.com',  // Sender address
      to: newAdmin.adminEmail,            // Receiver (new admin's email)
      subject: 'Welcome to Translator App - Admin Credentials',
      text: `
        Hello ${newAdmin.adminName},

        You have been successfully added as an Admin for the Translator App.

        Here are your login details:
        Username: ${newAdmin.username}
        Password: ${newAdmin.password}

        Please keep this information safe and secure.

        Welcome aboard!

        Regards,
        Translator App Team - CODEWAVES
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: "Admin Created, but email sending failed." });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ message: "Admin Created Successfully and Email sent." });
      }
    });

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
