import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async index(req, res) {
    const listUser = await prisma.user.findMany();

    return res.json(listUser);
  }

  async create(req, res) {
    const { email, password } = req.body;

    const createUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return res.json(createUser);
  }
}

export default UserController;
