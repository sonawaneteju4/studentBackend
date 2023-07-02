const connectToMongo = require('./db.js');
const express = require('express');
require("dotenv").config();
const os  = require('os')


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
  console.log(os.freemem())
console.log(os.homedir())
console.log(os.type())
console.log(os.uptime())
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
