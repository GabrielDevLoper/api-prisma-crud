import "dotenv/config";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "Usuário não autenticado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = payload.userId;

    return next();
  } catch (error) {
    return res.json({ message: "token inválido" });
  }
};
