// Importando o criador das rotas
import { Router } from "express"

// Importando o Request e o Response 
import { Request, Response } from "express"

// bcrypt
import bcrypt from 'bcrypt'

// Importando o Prisma 
import prisma from "../lib/prisma"

// mini servidor de rotas
const router = Router()


// ROTAS
// Rota Login
router.post('/loginUsuarios', async (req: Request, res: Response) => {

    // Requisição do corpo
    const {nome, senha} = req.body;

    

    // Verificando se os dados estão vindo do request
    if (!nome || !senha) {
        res.status(404).json({mensagem: "Erro cadastre-se"})
        return
    }

    try {
        
        // Buscando o usuario pelo nome
        const user = await prisma.usuariosPatolinopoles.findUnique({where: {nome: nome} });
        

        // Se usuario nao existir 
        if (!user) {
            return res.status(404).json({mensagem: "Usuario nao encontrado"})
        }

        if (user === null) {
            return res.status(400).json({mensagem: "Erro esta vindo  nulo"})
        }

        const passwordIsValid = await bcrypt.compare(senha, user.senha)

        console.log(passwordIsValid)



        // Aqui se o role for admin entra em uma pagina diferente do usuario
        if (user.role === "admin") {
             res.status(200).json({mensagem: "Logando com conta admin"})
        }else {
            return res.status(200).json({
                mensagem: "Usuario encontrado com sucesso",
                id: user.id,
                nome: user.nome
            })
        }


    } catch (error) {
        
        console.log(error)
         return res.status(500).json({mensagem: "Erro no servidor tente novamente mais tarde"})
    }



})



// exportando 
export default Router