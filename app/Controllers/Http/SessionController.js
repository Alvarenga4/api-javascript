'use strict'

const User = use('App/Models/User');

class SessionController {
  async create({ request, auth, response }) {
    try {
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);
      const user = await User.findByOrFail('email', email);

      return { token, user }
    } catch(err) {
      console.log(err);
      return response.status(500).json({err: "Erro interno."})
    }
  }
}

module.exports = SessionController
