const fs = require('fs');
const parse = require('csv-parser');
const natural = require('natural');

const trainedClassifierPath = 'trainedClassifier.json';

const buildModel = () => {
    const Classifier = new natural.BayesClassifier();
    const dataset = [];

    fs.createReadStream('EmotionDataset.csv', { headers: ['text', 'emotion'] })
        .pipe(parse())
        .on('data', (row) => {
            dataset.push({ text: row.text, emotion: row.emotion });
        })
        .on('end', () => {
            dataset.forEach((data) => {
                Classifier.addDocument(data.text, data.emotion);
            });

            Classifier.train();

            // Save the trained classifier to a file
            fs.writeFileSync(trainedClassifierPath, JSON.stringify(Classifier));
        });

    return Classifier;
};

const loadOrCreateModel = () => {
    if (fs.existsSync(trainedClassifierPath)) {
        // Load the trained classifier from the file
        const savedClassifier = JSON.parse(fs.readFileSync(trainedClassifierPath));
        return natural.BayesClassifier.restore(savedClassifier);
    } else {
        // If the file doesn't exist, build the model
        console.log('Trained classifier not found. Building the model...');
        return buildModel();
    }
};

const Classifier = loadOrCreateModel();

module.exports = Classifier;
