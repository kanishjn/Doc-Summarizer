const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const askRoute = require('./routes/ask');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', uploadRoute);
app.use('/ask', askRoute);

app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
});