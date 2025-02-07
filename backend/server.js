const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { readdirSync, read } = require('fs');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:5173', // ระบุ origin ที่อนุญาตให้เข้าถึง
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(morgan('dev'));
app.use(bodyParser.json());

readdirSync('./routes').map((c) => app.use('/api', require('./routes/' + c)));

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
