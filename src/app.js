require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const User = require('./models/User')

app.get('/', (req, res) => {
    res.status(200).json({msg: 'hello world!'})
})

app.post('/auth/register', async(req, res) => {

    const { name, email, password, confirmPassword } = req.body

    if(!name){
        return res.status(422).json({ msg: 'nome obrigatório' })
    }
    if(!email){
        return res.status(422).json({ msg: 'email obrigatório' })
    }
    if(!password){
        return res.status(422).json({ msg: 'senha obrigatório' })
    }
})

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.dkr19.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log('conectou ao banco')
}).catch((err) => {
    console.log(err)
})
