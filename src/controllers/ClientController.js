import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    /**Paginação com a listas de clientes */
    const { page = 1 } = req.query;
    try {
      const listclient = await prisma.client.findMany({
        skip: (page - 1) * 5,
        take: 5,
      });

      return res.json(listclient);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async create(req, res) {
    const { name_client, email, cpf, contact } = req.body;

    try {
      const client = await prisma.client.findOne({
        where: {
          cpf,
        },
      });

      if (client) {
        return res.json({ message: "Usuário já existe" });
      }

      const createclient = await prisma.client.create({
        data: {
          email,
          cpf,
          contact,
          name_client,
        },
        include: {
          address: true,
        },
      });

      return res.json(createclient);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { name_client, email, cpf, contact } = req.body;

    try {
      const client = await prisma.client.update({
        where: {
          id: Number(id),
        },
        data: {
          name_client,
          email,
          cpf,
          contact,
        },
      });

      return res.json(client);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deleteClient = await prisma.client.delete({
        where: {
          id: Number(id),
        },
        include: {
          address: true,
        },
      });

      await prisma.address.delete({
        where: {
          id: deleteClient.address.id,
        },
      });

      return res.json(deleteClient);
    } catch (error) {
      return res.json({ message: error });
    }
  },
};
