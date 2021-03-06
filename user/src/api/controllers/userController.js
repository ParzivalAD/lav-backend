const jwt = require('jsonwebtoken');
const User = require('../../schemas/user');

module.exports = {
  async store(req, res) {
    const { name, phone, email, password, type } = req.body;

    if (!name || !phone || !email || !password || !type) {
      return res.status(400).json({
        error: 'incomplet_fields',
        message: 'Campos obrigatórios incompletos',
        success: false,
      });
    }

    const allowedTypes = ['customer', 'service_provider'];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        error: 'invalid_type',
        message: 'Tipo de usuário inválido',
        success: false,
      });
    }

    try {
      // Verificando se email e telefone ja foi cadastrado
      const emailExists = await User.findOne({ email });
      const phoneExists = await User.findOne({ phone });

      if (emailExists) {
        return res.json({ 
          success: false,
          error: 'email_already_exists',
          message: 'E-mail já existe',
        });
      }

      if (phoneExists) {
        return res.json({ 
          success: false,
          error: 'phone_already_exists',
          message: 'Telefone já existe',
        });
      }

      const user = await User.create({ name, phone, email, password });
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 24600,
      });

      user.password = undefined;

      return res.json({ success: true, token, user });
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Erro no servidor',
        success: false,
      });
    }
  },

  async show(req, res) {
    const { _id } = req.params;

    try {
      const user = await User.findOne({ _id });

      user.password = undefined;

      return res.json({ success: true, user });
    } catch (error) {
      return res.status(404).json({
        error: 'user_not_found',
        message: 'Usuário não encontrado',
        success: false,
      });
    }
  },

  async update(req, res) {
    const { _id } = req.params;
    const { name, phone, email, password, type, address_id } = req.body;

    if (!name || !phone || !email || !password || !type) {
      return res.status(400).json({
        error: 'incomplet_fields',
        message: 'Campos obrigatórios incompletos',
        success: false,
      });
    }

    try {
      let data = { name, phone, email, password, type };

      if (address_id) {
        data.address_id = address_id;
      }

      const user = await User.findOneAndUpdate(
        { _id },
        data,
        { new: true },
      );

      if (!user) {
        return res.status(404).json({
          error: 'user_not_found',
          message: 'Usuário não encontrado',
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(404).json({
        error: 'invalid_address_id',
        message: 'ID de endereço inválido',
        success: false,
      });
    }
  }
};
