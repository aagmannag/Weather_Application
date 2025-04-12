const express = require('express');
const cors = require('cors');
const weatherRouter = require('./routes/weather');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

app.use('/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
