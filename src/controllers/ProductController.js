import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listProduct = await prisma.product.findMany();

    return res.json(listProduct);
  },

  async create(req, res) {
    const { category_id } = req.params;
    const { name_product, price, qtd } = req.body;
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
  },

  async delete(req, res) {
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ message: "Produto excluído com sucesso" });
  },

  async update(req, res) {
    const { product_id, category_id } = req.params;
    const { name_product, price, qtd } = req.body;
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
  },
};
