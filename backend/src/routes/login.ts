// Importando o criador das rotas
import { Router } from "express"

// Importando o Request e o Response 
import { Request, Response } from "express"

// bcrypt
import bcrypt from 'bcrypt'

// Importando o Prisma 
import prisma from "../lib/prisma"

import jwt from "jsonwebtoken";


require('dotenv').config()

const JtwNoEnv = process.env.JWT_PASS;

type JWTPayload = {
    id: number
}


// mini servidor de rotas
const router = Router()


// ROTAS
// Rota Login
router.post("/login", async (req: Request, res: Response) => {

    // Requisição do corpo
    const {nome, senha} = req.body;

    // Verificando se os dados estão vindo do request
    if (!nome || !senha) {
        res.status(404).json({mensagem: "Erro cadastre-se"})
        return
    }

    try {
        // Buscando o usuario pelo nome
        const user = await prisma.usuariosPatolinopoles.findFirst({
            where:{
                nome: nome
            }
        })

        // Se usuario nao existir 
        if (!user) {
            return res.status(404).json({mensagem: "Usuario ou senha invalidos"})
        }

        // comparando a senha com o bcrypt
        const passwordIsValid = await bcrypt.compare(senha, user.senha);

        // verificando a senha
        if (!passwordIsValid) {
            return res.status(404).json({mensagem: "Usuario ou senha invalidos"})
        }

        // Usuario ou senha invalidos

        // Tenho que terminar esse token, tenho que fazer o token ser verificado 
        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '10m'});

        // Aqui se o role for admin entra em uma pagina diferente do usuario
        if (user.role === "admin") {
            return res.status(200).json({mensagem: "Logando com sua conta admin"})
        }else {
            return res.status(200).json({
                mensagem: "Usuario encontrado com sucesso",
                token: token
            })
            
        }

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor tente novamente mais tarde"})
    }
})



// Rota para mostrar o nome
router.get('/login', async (req: Request, res: Response) => {
    
    // Buscando Pelo Token
    const { authorization } = req.headers

    try {


        if (!authorization) {
            return  res.status(403).json({mensagem: "Nao Autorizado"})
        }

        // Tranformando a string em um array
        const token = authorization.split(' ')[1]

        // Verificando o Token
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JWTPayload


        // Buscando o id
        const user = await prisma.usuariosPatolinopoles.findUnique({
            where:{ 
                id: id as any
            }
        }) 


        // Verificando se o usuario é ele mesmo
        if (!user) {
            return  res.status(403).json({mensagem: "Nao Autorizado"})
        }else {
            return res.status(200).json({mensagem: "Token verificado",
                id: user.id,
                nome: user.nome
            })
        }

        


        // // Verificando se encontrou o usuario
        // if (!idUsuario) {
        //     return res.status(404).json({mensagem: "Usuário não encontrado"})
        // }


        // // Buscando o usuario
        // const usuarioListado = await prisma.usuariosPatolinopoles.findUnique({
        //     where:{
        //         id: idUsuario  as any  //Aqio esta vindo o id, nome,senha, ano de nascimento e role
        //     }
        // });



        // // Verificando se o usuario existe
        // if (usuarioListado) {
        //     return res.status(200).json(usuarioListado)
        // }else {
        //     res.status(404).json({mensagem: "Usuario não encontrado"})
        // }

        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});
    }




}) 



// exportando 
export default router