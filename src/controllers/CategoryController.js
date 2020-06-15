import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listCategory = await prisma.category.findMany();

    return res.json(listCategory);
  },
  async create(req, res) {
    const { name_category } = req.body;

    const category = await prisma.category.create({
      data: {
        name_category,
      },
    });

    return res.json(category);
  },
};
