require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

var authRouter = require('./routes/AuthRouter')
var userRouter = require('./routes/UserRouter')
var profileRouter = require('./routes/ProfileRouter')
var productRouter = require('./routes/ProductRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/product', productRouter)

// start
app.get('/', (req, res) => {
    res.status(200).json({msg: 'hello world!'})
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.dkr19.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3009)
    console.log('conectou ao banco')
}).catch((err) => {
    console.log(err)
})

