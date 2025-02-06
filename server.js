const express = require('express');
const multer = require('multer');
const app = express();
app.use(express.urlencoded({extended : true}));
const path=require('path');
app.use(express.static(path.join(__dirname)));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const boardRoutes = require('./routes/board');
const userRoutes = require('./routes/user');
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/boards', boardRoutes);
app.use('/api/users',userRoutes);


let port = 4000;
const server = app.listen(port, () => {
    console.log(`server on localhost:${port}`);
});
