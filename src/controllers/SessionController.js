import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

const prisma = new PrismaClient();

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findOne({ where: { email } });

    if (!user) {
      return res.json({ message: "Usuário não encontrado" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ message: "Senha Incorreta" });
    }

    return res.json({
      token: jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2d",
        }
      ),
    });
  }

  async userLogged(req, res) {
    const user = await prisma.user.findOne({
      where: {
        id: req.userId,
      },
    });

    return res.json({ email: user.email, name: user.name_user });
  }
}

export default new SessionController();
