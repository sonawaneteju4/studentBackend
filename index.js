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
  res.send('You Are Connected To WebApp')
});

const start = async () => {
  try {
    await connectToMongo(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
      console.log("Server Info As Bellow")
      console.log("Free Memory"+os.freemem())
       console.log("HomeDir"+os.homedir())
        console.log("osType"+os.type())
          console.log("uptime"+os.uptime())
      console.log("EQL"+os.EOL)
console.log("PlatForm"+os.platform())
console.log("release"+os.release())
console.log("Loading"+os.loadavg())
      
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

start();
