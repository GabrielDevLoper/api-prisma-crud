import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const listProduct = await prisma.product.findMany({
        skip: (page - 1) * 5,
        take: 5,
      });

      return res.json(listProduct);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async create(req, res) {
    const { category_id } = req.params;
    const { name_product, price, qtd } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          name_product,
          price,
          qtd,
          price_total: price * qtd,
          category: {
            connect: {
              id: Number(category_id),
            },
          },
        },
      });

      return res.json(product);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async update(req, res) {
    const { product_id, category_id } = req.params;
    const { name_product, price, qtd } = req.body;

    try {
      const product = await prisma.product.update({
        where: {
          id: Number(product_id),
        },
        data: {
          name_product,
          price,
          qtd,
          price_total: price * qtd,
          category: {
            connect: {
              id: Number(category_id),
            },
          },
        },
      });

      return res.json(product);
    } catch (error) {
      return res.json({ message: error });
    }
  },
};
