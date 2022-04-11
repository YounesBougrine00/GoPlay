require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const userRouter = require('./routes/usersRouter');
const stadiumRouter = require('./routes/stadiumsRouter');
const reservationRouter = require('./routes/reservationRouter')

const dbConnection = require("./db");

dbConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


app.use('/api/user', userRouter);
app.use('/api/stadiums', stadiumRouter)
app.use('/api/reservations', reservationRouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static('ClinetSide/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'ClientSide', 'build', 'index.html'))
    })
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server listnening on Port', PORT)
})