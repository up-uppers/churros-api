const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User');

class AuthController {
    
    async register (req, res) {

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
    }


    async login (req, res) {
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
            
            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 3600 // Expira em 3600 segundos ou 1 hora.
            })
    
            res.status(200).json({ msg: "autenticação realizada com sucesso", token })
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    }
}

module.exports = new AuthController();