import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listUser = await prisma.user.findMany();

    return res.json(listUser);
  },

  async create(req, res) {
    const { email, password } = req.body;

    //Criptografando a senha do usuario
    const passwordHash = await bcrypt.hash(password, 8);
    try {
      const createUser = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
        },
      });

      const { id } = createUser;

      return res.json({ id });
    } catch (error) {
      return res.json({ message: error });
    }
  },
};
