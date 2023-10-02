const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Token {
  async createToken(email, password) {
    const user = await prisma.user.findUnique({ where: { email: email }})
    
    if (user.password === password ) {
      const token = jwt.sign(
        { email: user.email, id: user.id },
        "4b0d30a9f642b3bfff67d0b5b28371a9",
        {
          expiresIn: "1h",
        }
      );
      return token;
    }
  }
}

module.exports = { Token };
