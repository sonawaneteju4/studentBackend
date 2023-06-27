const connectToMongo = require('./db.js');
const express = require('express');
require("dotenv").config();


connectToMongo ();
const cors = require('cors');

const app = express();
const PORT =process.env.PORT|| 5000;

app.use(cors());
app.use(express.json());

app.use('/api/studentRoutes', require('./routes/myApi'));
// app.use('/api/students', require('./routes/myApi'));


app.get('/', (req, res) => {
  res.send('You Are Connected');
});

const start = async () => {
  try {
    await connectToMongo(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

start();
