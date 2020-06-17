import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    try {
      const listCategory = await prisma.category.findMany({
        include: {
          product: true,
        },
      });

      return res.json(listCategory);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async create(req, res) {
    const { name_category } = req.body;

    try {
      const category = await prisma.category.create({
        data: {
          name_category,
        },
      });

      return res.json(category);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.category.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json({ message: "Categoria excluída com sucesso!" });
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { name_category } = req.body;

    try {
      const category = await prisma.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name_category,
        },
      });

      return res.json(category);
    } catch (error) {
      return res.json({ message: error });
    }
  },
};
