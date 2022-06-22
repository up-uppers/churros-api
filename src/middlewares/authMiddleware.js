const jwt = require('jsonwebtoken')
const userModel = require('../models/User')
const profileModel = require('../models/ProfileModel')

class AuthMiddleware {

    async checkToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({ msg: "Acesso negado!" })
        }
    
        try {
            const secret = process.env.SECRET
    
            jwt.verify(token, secret, (err, decoded) => {
                if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token!' });
      
                // se tudo estiver ok, salva no request para uso posterior
                req.userId = decoded.id;
                next()
            })
        } catch (error) {
            res.status(400).json({ msg: "Token inválido!" })
        }
    }

    async hasPermission(req, res, next) {
        const userId = req.userId
        const user = await userModel.findById(userId)
        const profile = await profileModel.findOne({ code: user.profile })
        
        if(!profile || !user.profile) {
            return res.status(401).json({ msg: "Perfil não encontrado!" })
        }

        if (user.profile == 2) {
            return next();
        }

        if (req.route.methods.get && profile.permissions.includes('list')) {
            return next();
        }
 
        if (req.route.methods.post && profile.permissions.includes('create')) {
            return next();
        }

        if (req.route.methods.put && profile.permissions.includes('update')) {
            return next();
        }

        if (req.route.methods.delete && profile.permissions.includes('delete')) {
            return next();
        }

        return res.status(401).json({ msg: "Você não tem permissão de acesso!" })

    }
}

module.exports = new AuthMiddleware()