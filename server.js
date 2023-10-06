const express = require('express')
const router = require('./router')
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const DbConnect = require('./database')

const app = express();

// console.log(process.env.FRONT_END_URL)
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONT_END_URL],
    credentials: true
}))
app.use(cookieParser());
app.use(router)
DbConnect();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})