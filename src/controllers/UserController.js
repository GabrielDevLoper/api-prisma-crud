import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listUser = await prisma.user.findMany();

    return res.json(listUser);
  },

  async create(req, res) {
    const { email, password } = req.body;

    const createUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const { id } = createUser;

    return res.json({ id });
  },
};
