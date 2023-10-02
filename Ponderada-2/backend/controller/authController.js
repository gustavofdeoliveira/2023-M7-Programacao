const authService = require("../service/authService");
require("express-async-errors");

const createToken = async (req, res) => {
  //Pega as infos da requisição
  const { email, password } = req.body;

  //Instancia a classe criando uma vaga
  const auth = new authService.Token();

  try {
    const token = await auth.createToken(email, password);
    res.status(200).json({
      message: "Token created successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//Exporta as funções do controller para o ROUTER
module.exports = {
  createToken,
};
