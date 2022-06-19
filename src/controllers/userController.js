
class UserController {

    // async save(req, res) {

    // }


    async find (req, res) {
        const id = req.params.id

        const user = await User.findById(id, '-password')
    
        if(!user) {
            return res.status(404).json({ msg: 'usuário não encontrado' })
        }
    
        res.status(200).json({ user })
    }
}

module.exports = new UserController();