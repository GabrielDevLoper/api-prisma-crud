import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listProduct = await prisma.product.findMany();

    return res.json(listProduct);
  },

  async create(req, res) {
    const { name_product, price, qtd } = req.body;
    const product = await prisma.product.create({
      data: {
        name_product,
        price,
        qtd,
        price_total: price * qtd,
        category: {
          connect: {
            id: 3,
          },
        },
      },
    });

    return res.json(product);
  },
};
