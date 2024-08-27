const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRouter = require('./routes/studentRoutes'); 

const url = 'mongodb://127.0.0.1:27017/MGIT';
const app = express();

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use(express.json());

app.use('/students', studentRouter); 

const port = 9000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
