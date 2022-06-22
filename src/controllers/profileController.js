const profileModel = require('../models/ProfileModel');

class ProfileController {

  async create(req, res) {
    const { name, role, permissions, code } = req.body
      const result = await profileModel.create({
          name,
          role,
          permissions,
          code
      });
      res.status(201).json(result);
  }

}

module.exports = new ProfileController();