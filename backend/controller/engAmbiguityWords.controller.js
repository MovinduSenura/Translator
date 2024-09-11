const ambiENGmodel = require("../models/engAmbiguityWords.model");

//Insert Words
const insertEngAmbiWrds = async (req, res) => {

    const newEngAmbiWrd = new ambiENGmodel(req.body);

    try {
        await newEngAmbiWrd.save();

        res.status(201).json({ message: 'English Ambiguous Word Created Successfully' });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'English Ambiguous Word Creation Failed' });
    }
};


//Retrieve all the words
const getAllEngAmbiWrds = async (req, res) => {

    const EngAmbiWrds = await ambiENGmodel.find();

    try {

        if (EngAmbiWrds.length === 0) {
            return res.status(404).json({ message: 'No Ambiguous Words found' });
        }

        res.status(200).json({
            message: 'English Ambiguous Words Fetched Successfully',
            data: EngAmbiWrds
        })


    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'English Ambiguous Words Data Fetching Failed!' })
    }
}

//Fetch word by id
const getEngAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const EngAmbiWrd = await ambiENGmodel.findById(id);

        if (!EngAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the English Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s English Ambiguous Word Data Fetched`,
            data: EngAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "English Ambiguous Word's Data Fetching Failed" })
    }
}

//Update word by id
const updateEngAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const updateEngAmbiWrd= await ambiENGmodel.findByIdAndUpdate(id, req.body, {new : true});

        if (!updateEngAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the English Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s English Ambiguous Word Data Successfully Updated`,
            data: updateEngAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "English Ambiguous Word's Data Updating Failed" })
    }
}


//Delete word by id
const deleteEngAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteEngAmbiWrd = await ambiENGmodel.findByIdAndDelete(id);

        if (!deleteEngAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the English Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s English Ambiguous Word Data Successfully Deleted`,
            data: deleteEngAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "English Ambiguous Word's Data Deleting Failed" })
    }
}


module.exports = {
    insertEngAmbiWrds,
    getAllEngAmbiWrds,
    getEngAmbiWrdById,
    updateEngAmbiWrdById,
    deleteEngAmbiWrdById
};
