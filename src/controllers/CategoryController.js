import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listCategory = await prisma.category.findMany({
      include: {
        product: true,
      },
    });

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
  async delete(req, res) {
    const { id } = req.params;
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ message: "Categoria excluída com sucesso!" });
  },
  async update(req, res) {
    const { id } = req.params;
    const { name_category } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name_category,
      },
    });

    return res.json(category);
  },
};
