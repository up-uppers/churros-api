require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

var authRouter = require('./routes/AuthRouter')
var userRouter = require('./routes/UserRouter')

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)


app.get('/', (req, res) => {
    res.status(200).json({msg: 'hello world!'})
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.dkr19.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log('conectou ao banco')
}).catch((err) => {
    console.log(err)
})
