// Importa o criador de rotas separadas
import { Router } from "express";

import { Request, Response } from "express";

// importando o prisma
import prisma from "../lib/prisma";

const router = Router()

// criando a rota postagem
router.post('/postagem', async (req: Request, res: Response) => {

    // Pegando a postagem
    const {postagem} = req.body;

    // Verificando se veio o request
    if (!postagem) {
        return res.status(404).json({mensagem: "Postagem não existe"})
    }

    // Try
    try {

        // Se não existir
        if (!postagem) {
            return res.status(404).json({mensagem: "Erro na postagem"});
        };

        // Criando a postagem no banco de dados
        await prisma.postagemUser.create({data:{postagem: postagem}});

        return res.status(201).json({mensagem: "Postagem criada com sucesso"})
        


    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor tente novamente mais tarde"});
    }

});


// carregando o post dos usuarios
router.get('/postagem', async (req: Request, res: Response) => {

    try {

        const buscarPostagem = await prisma.postagemUser.findMany();
        res.status(200).json(buscarPostagem)
    
    } catch (error) {

        return res.status(500).json({mensagem: "Erro no servidor tente novamente mais tarde"})    
    
    }
})

// exportando
export default router;