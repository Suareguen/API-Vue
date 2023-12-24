const Lab = require('../models/labs.model'); // Adjust the path as necessary

// Create a new Lab
const createLab = async (req, res) => {
    try {
        const lab = new Lab(req.body);
        await lab.save();
        res.status(201).json(lab);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Labs
const getAllLabs = async (req, res) => {
    try {
        const labs = await Lab.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Lab by id
const getLab = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.status(200).json(lab);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Lab by id
const updateLab = async (req, res) => {
    try {
        const lab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.status(200).json(lab);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Lab
const deleteLab = async (req, res) => {
    try {
        const lab = await Lab.findByIdAndDelete(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.status(200).json({ message: 'Lab deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createLab,
    getAllLabs,
    getLab,
    updateLab,
    deleteLab
}