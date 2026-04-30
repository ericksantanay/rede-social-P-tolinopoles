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
            create: {biografia: biografia}
        })

        return res.status(201).json({mensagem: "Biografia Criada com sucesso"});

    } catch (error) {
        console.log("Vamos ver o erro que esta acontecendo" + error)
        return res.status(403).json({ mensagem: "Token inválido" });
    };
});


// Rota para carregar a biografia
router.get('/biografiaRouter', async (req: Request, res: Response) => {

    try {
        
        const bios = await prisma.biografiaUsuario.findMany({
            include: {
                usuario: true
            }
        })

        // Resultado da biografia e do nome do usuario
        const resultado = bios.map(bio => ({biografia: bio.biografia, nome: bio.usuario?.nome}));

        return res.status(200).json(resultado)

    } catch (error) {
        console.log("ERRO NO BACKEND:", error)
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }

});




export default router;