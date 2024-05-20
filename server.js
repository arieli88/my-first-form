import express from 'express';
// const fs = require('fs');
import { appendFile } from 'fs/promises'
import mongoose from 'mongoose';
import registrationModel from './registration.model.js';
// const path = require('path');

const app = express();
const PORT = 3001; // Make sure this port is free or change as necessary

await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/DB_Form');
app.use(express.json());
app.use(express.static('public'));  // Serve static files from the current directory
const { log, warn } = console
// const filePath = path.join(__dirname, 'DB_Form.csv'); // Ensures the path is always correct



app.post('/saveData', async (req, res) => {
    log('POST request received', req.body);
    // const { name, phone, address, participants, vacation } = req.body;
    // for (const field of [name, phone, address, participants, vacation]) {
    //     if (!field) {
    //         warn({
    //             errorType: 'missingField',
    //             name, phone, address, participants, vacation
    //         })
    //         return res.status(400).send('All fields are required');
    //     }
    // }


    await registrationModel.create(req.body)
    .then(log)
    
    .catch(err => {})
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
