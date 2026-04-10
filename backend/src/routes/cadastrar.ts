// Importa o criador de rotas separadas
import { Router } from "express"

// Importando o prisma
import prisma from '../prisma';
import { Request, Response } from "express"

// Isso cria um mini servidor de rotas 
const router = Router()

// Rota de cadastro de usuarios
router.post('/cadastrarUsuarios', async (req: Request, res: Response ) => {

    // pegando a requisição do corpo
    const {nome, senha} =  req.body;

    // verificando se o usuario se cadastrou pelo req 
    if (!nome || !senha) {
       return res.status(400).json({mensagem: "Erro cadastre-se"})
    };

   try {
    
    // buscando o usuario
    const buscarUser = await prisma.usuarios.findUnique({
        where: {
            nome: nome
        }
    });

    if (!buscarUser) {
         // criandoo usuario
        await prisma.usuarios.create({
            data:{
                nome: nome,
                senha: senha,
                role: "cliente"
            }
        });
    }else {
        return res.status(400).json({mensagem: "Esse usuario já esta em uso"})
    }

    res.status(201).json({mensagem: "Usuário cadastrado com sucesso"})

   } catch (error) {
    console.log(error)
        return res.status(500).json({mensagem: "Erro no servidor"})
   }

})  


// esse export serve para eu conseguir liberar as rotas e importar no index.ts
export default router