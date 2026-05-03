import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

type IdUser = {
    id: string
}


router.post('/biografiaRouter', async (req: Request, res: Response) => {

    const { biografia } = req.body;
    const { authorization } = req.headers;


    if (!biografia) {
        return res.status(400).json({ mensagem: "Biografia não existe" });
    }


    if (!authorization) {
        return res.status(403).json({ mensagem: "Sem token" });
    }


    try {
        
        // Pegando o token para ver quem é o usuario
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS!) as IdUser;


        await prisma.biografiaUsuario.upsert({
            where: {userId: id},
            update: {biografia: biografia},
            create: {
                biografia: biografia,
                userId: id
            }
        })

        return res.status(201).json({mensagem: "Biografia Criada com sucesso"});

    } catch (error) {
        console.log("Vamos ver o erro que esta acontecendo" + error)
        return res.status(403).json({ mensagem: "Token inválido" });
    };
});


// Rota para carregar a biografia
router.get('/biografiaRouter', async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    // 1. Verifica se tem token
    if (!authorization) {
        return res.status(403).json({ mensagem: "Sem token" });
    }

    try {
        // 2. Extrai o token
        const token = authorization.split(' ')[1];

        // 3. Verifica o token
        const { id } = jwt.verify(token, process.env.JWT_PASS!) as IdUser;

        // 4. Busca a biografia do usuário
        const bio = await prisma.biografiaUsuario.findUnique({
            where: { userId: id }
        });

        // 5. Retorno
        return res.status(200).json(bio);

    } catch (error) {
        console.log("Erro no GET biografia:", error);
        return res.status(403).json({ mensagem: "Token inválido" });
    }
});




export default router;