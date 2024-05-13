const express = require('express');
const fs = require('fs');
// const { appendFile } = require('fs/promises')

const app = express();
const PORT = 3001; // Make sure this port is free or change as necessary


app.use(express.json());
app.use(express.static('public'));  // Serve static files from the current directory
const path = require('path');
const { log } = require('console');
const filePath = path.join(__dirname, 'DB_Form.csv'); // Ensures the path is always correct


app.post('/saveData', (req, res) => {
    const { name, phone, address, participants, vacation } = req.body;
    // Prepare the data as a CSV row. Note the quotation marks around each piece of data.
    const csvRow = `"${name}","${phone}","${address}","${participants.join('|')}","${vacation}"\n`;
    log({csvRow})
    fs.appendFile(filePath, csvRow, 'utf8', (err) => {
        if (err) {
            console.error('Failed to save data:', err);
            res.status(500).send('Failed to save data');
            return;
        }
        console.log('Saved data to', filePath);  // Confirm data writing in the console
        res.status(201).send('Data saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
