'use strict'

const User = use('App/Models/User');

class UserController {
  async index({ response }) {
    try {
      const users = await User.all();

      return users
    } catch(err) {
      console.log(err);
      return response.status(500).json({ error: 'Erro com o servidor.' });
    }
  }
  async store({ request, response }) {
    try {
      const data = await request.only([
        "name",
        "last_name",
        "email",
        "password",
        "phone_number"
      ]);

      const verify_email = await User.query().where('email', data.email).first();

      if (verify_email) {
        return response.status(409).json({conflict: "Email já cadastro"});
      }

      const user = await User.create(data);

      return response.status(201).json(user);

    } catch(error) {
      console.log(error);
      return response.status(500).json({ error: 'Erro com o servidor.' });
    }
  }

  async show({ params, response }) {
    try {

      const user = await User.find(params.id);

      if (!user) {
        return response.status(404).json({error: "Nenhum usuário encontrado"});
      }

      return user;

    } catch (err) {
      console.log(error);
      return response.status(500).json({ error: 'Erro com o servidor.' });
    }
  }
}

module.exports = UserController
