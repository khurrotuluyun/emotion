const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const classifyController = require('./controllers/classifyController');
const Classifier = require('./model');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.post('/classify', classifyController.classifyText);
app.get('/entries', classifyController.getEntries);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
