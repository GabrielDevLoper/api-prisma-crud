import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req, res) {
    const listclient = await prisma.client.findMany({
      include: {
        address: true,
      },
    });

    return res.json(listclient);
  },

  async create(req, res) {
    const { name_client, email, cpf, contact } = req.body;

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
  },

  async update(req, res) {
    const { id } = req.params;
    const { name_client, email, cpf, contact } = req.body;

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
  },

  async delete(req, res) {
    const { id } = req.params;

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
  },
};
