import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const address = await prisma.address.findMany({
      include: {
        client: true,
      },
    });

    return res.json(address);
  },

  async create(req, res) {
    const { id } = req.params;
    const { state, city, neighborhood, number, street } = req.body;

    const client = await prisma.client.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!client) {
      return res.json({ message: "Cliente não encontrado" });
    }

    const address = await prisma.address.create({
      data: {
        city,
        neighborhood,
        number,
        state,
        street,
        client: {
          connect: {
            id: Number(id),
          },
        },
      },
    });

    return res.json(address);
  },

  async update(req, res) {
    const { id } = req.params;
    const { city, neighborhood, number, state, street } = req.body;

    const address = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: {
        city,
        neighborhood,
        number,
        state,
        street,
      },
    });

    return res.json(address);
  },

  async delete(req, res) {
    const { id } = req.params;
    await prisma.address.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json({ message: "Endereço excluído" });
  },
};
