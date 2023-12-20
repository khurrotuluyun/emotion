const { TextEntry } = require('../models');
const Classifier = require('../model');

const classifyText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required in the request body.' });
        }

        // Make a prediction using the loaded classifier
        const emotion = Classifier.classify(text);

        // Save the entry to the database
        await TextEntry.create({ text, emotion });

        return res.json({ emotion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getEntries = async (req, res) => {
    try {
        const entries = await TextEntry.findAll();
        return res.json(entries);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = { classifyText, getEntries };
