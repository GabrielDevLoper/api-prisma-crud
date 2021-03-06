import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    try {
      const address = await prisma.address.findMany({
        include: {
          client: true,
        },
      });

      return res.json(address);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async create(req, res) {
    const { id } = req.params;
    const { state, city, neighborhood, number, street } = req.body;

    try {
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
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { city, neighborhood, number, state, street } = req.body;

    try {
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
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.address.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Endereço excluído" });
    } catch (error) {
      return res.json({ message: error });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    const address = await prisma.address.findOne({
      where: {
        id: Number(id),
      },
    });

    return res.json(address);
  },
};
