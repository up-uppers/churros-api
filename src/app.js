require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()

app.unsubscribe(bodyParser.json())
app.unsubscribe(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({msg: 'hello world!'})
})

app.listen(3000)
