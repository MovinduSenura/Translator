const ambiSINNmodel = require("../models/sinAmbiguityWords.model");

//Insert Words
const insertSinAmbiWrds = async (req, res) => {

    const newSinAmbiWrd = new ambiSINNmodel(req.body);

    try {
        await newSinAmbiWrd.save();

        res.status(201).json({ message: 'Sinhala Ambiguous Word Created Successfully' });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Sinhala Ambiguous Word Creation Failed' });
    }
};


//retrieve all the contract details
const getAllSinAmbiWrds = async (req, res) => {

    const SinAmbiWrds = await ambiSINNmodel.find();

    try {

        if (!SinAmbiWrds) {
            res.status(404).json({ message: 'No Ambiguous Words there' })
        }

        res.status(200).json({
            message: 'Sinhala Ambiguous Words Fetched Successfully',
            data: SinAmbiWrds
        })


    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Sinhala Ambiguous Words Data Fetching Failed!' })
    }
}

//Fetch contract by id
const getSinAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const SinAmbiWrd = await ambiSINNmodel.findById(id);

        if (!SinAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the Sinhala Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s Sinhala Ambiguous Word Data Fetched`,
            data: SinAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Sinhala Ambiguous Word's Data Fetching Failed" })
    }
}

//Update contract by id
const updateSinAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const updateSinAmbiWrd= await ambiSINNmodel.findByIdAndUpdate(id, req.body, {new : true});

        if (!updateSinAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the Sinhala Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s Sinhala Ambiguous Word Data Successfully Updated`,
            data: updateSinAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Sinhala Ambiguous Word's Data Updating Failed" })
    }
}


//Delete contract by id
const deleteSinAmbiWrdById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteSinAmbiWrd = await ambiSINNmodel.findByIdAndDelete(id);

        if (!deleteSinAmbiWrd) {
            res.status(404).json({ message: "Couldnt Find the Sinhala Ambiguous Word" })
        }

        res.status(200).json({
            message: `${id}'s Sinhala Ambiguous Word Data Successfully Deleted`,
            data: deleteSinAmbiWrd
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Sinhala Ambiguous Word's Data Deleting Failed" })
    }
}


module.exports = {
    insertSinAmbiWrds,
    getAllSinAmbiWrds,
    getSinAmbiWrdById,
    updateSinAmbiWrdById,
    deleteSinAmbiWrdById
};
