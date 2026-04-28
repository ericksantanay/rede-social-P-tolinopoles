import { Router } from "express";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/postagem', async (req: Request, res: Response) => {

    const { postagem, curtidas } = req.body;
    const { authorization } = req.headers;

    if (!postagem || !curtidas) {
        return res.status(400).json({ mensagem: "Postagem não existe" });
    }

    if (!authorization) {
        return res.status(403).json({ mensagem: "Sem token" });
    }

    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS!) as any;

        await prisma.postagemUser.create({
            data: {
                postagem: postagem,
                userId: id,
                curtidas: curtidas
            }
        });

        return res.status(201).json({ mensagem: "Postagem criada com sucesso" });

    } catch {
        return res.status(403).json({ mensagem: "Token inválido" });
    }
});


router.get('/postagem', async (req: Request, res: Response) => {
  try {

    const posts = await prisma.postagemUser.findMany({
      include: {
        usuario: true
      }
    });

    const resultado = posts.map(post => ({
      postagem: post.postagem,
      nome: post.usuario?.nome
    }));


    return res.status(200).json(resultado);

  } catch  (error){
    console.log("ERRO REAL BACKEND:", error)
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// exportando
export default router;