// @ts-check
import express from 'express';
import mongoose from 'mongoose';
import registrationModel from './registration.model.js';


const app = express();
const {PORT = 3001, MONGO_URI = 'mongodb://localhost:27017/DB_Form'} = process.env

await mongoose.connect(MONGO_URI);
app.use(express.json());
app.use(express.static('public'))
const { log, warn } = console




app.post('/saveData', async (req, res) => {
    // log('POST request received', req.body);


    await registrationModel.create([req.body], {lean:true,a:9})
    .then(log)
    .then(() => res.status(201).end('Data saved successfully'))
    
    .catch(warn)
    res.status(201).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
