if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false})); 

// Configure routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Connect database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log("Connected to Mongoose"));

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
});
