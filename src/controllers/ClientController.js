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
        include: {
          address: true,
        },
      });

      //retornando todos os clientes cadastrados na tabela
      const countClients = await prisma.client.count();
      res.header("X-Total-Count", countClients);
      res.header("Access-Control-Expose-Headers", "X-Total-Count");

      return res.json(listclient);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async create(req, res) {
    const {
      name_client,
      email,
      cpf,
      contact,
      city,
      neighborhood,
      number,
      state,
      street,
      zipcode,
    } = req.body;

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
          address: {
            create: {
              neighborhood,
              city,
              number,
              state,
              street,
              zipcode,
            },
          },
        },
      });

      return res.json(createclient);
    } catch (error) {
      return res.json({ message: error });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const {
      name_client,
      email,
      cpf,
      contact,
      neighborhood,
      city,
      number,
      state,
      street,
      zipcode,
    } = req.body;

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
          address: {
            update: {
              neighborhood,
              city,
              number,
              state,
              street,
              zipcode,
            },
          },
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

  async show(req, res) {
    const { id } = req.params;
    const showClient = await prisma.client.findOne({
      where: {
        id: Number(id),
      },
      include: {
        address: true,
      },
    });

    return res.json(showClient);
  },
};
