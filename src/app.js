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

app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({ msg: 'usuário não encontrado' })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    console.log(authHeader)
    console.log(token)
    if(!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" })
    }
}

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
    if(!confirmPassword){
        return res.status(422).json({ msg: 'confirmar a senha é obrigatório' })
    }
    if(password != confirmPassword){
        return res.status(422).json({ msg: 'as senhas não conferem' })
    }

    const userExists = await User.findOne({ email: email })

    if(userExists){
        return res.status(422).json({ msg: 'use outro email' })
    }

    // senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    
    if(!email){
        return res.status(422).json({ msg: 'email obrigatório' })
    }
    if(!password){
        return res.status(422).json({ msg: 'senha obrigatório' })
    }

    const user = await User.findOne({ email: email })

    if(!user){
        return res.status(404).json({ msg: 'usuário não encontrado' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({ msg: 'senha inválida' })
    }

    try {
        const secret = process.env.SECRET
        
        const token = jwt.sign(
          {
            id: user._id
          },
          secret
        )

        res.status(200).json({ msg: "autenticação realizada com sucesso", token })
    } catch (error) {
        res.status(500).json({ msg: error })
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
