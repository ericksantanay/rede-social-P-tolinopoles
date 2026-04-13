// Importa o criador de rotas separadas
import { Router } from "express";

import { Request, Response } from "express";
// Importando o prisma
import prisma from "../lib/prisma";

// bcrypt (criptografando senhas)
const  bcrypt  =  require ( 'bcrypt' );

import { hash } from 'bcrypt' // Importado a hash

import { randomInt } from "crypto" // 


// token JWT
const  jwt  =  require ( 'jsonwebtoken' ) ; 

// import {jwt} from ""


// Isso cria um mini servidor de rotas
const router = Router();

type user = {
  nome: string;
  senha: string;
  role: string;
};

// Rota de cadastro de usuarios
router.post("/cadastrarUsuarios", async (req: Request, res: Response) => {
  // pegando a requisição do corpo
  const { nome, senha, role } = req.body;

  // verificando se o usuario se cadastrou pelo req
  if (!nome || !senha || !role) {
    return res.status(400).json({ mensagem: "Erro cadastre-se" });
  }


  try {

    
   
    // Hash do bcrypt
    const randomSalt = randomInt(10, 16) //
    const passwordBy = await hash(senha, randomSalt) //

    // buscando o usuario
    const buscarUser = await prisma.usuariosPatolinopoles.findUnique({
      where: {
        nome: nome,
      },
    });

    if (!buscarUser) {
      // criandoo usuario
      await prisma.usuariosPatolinopoles.create({
        data: {
          nome: nome,
          senha: passwordBy,
          role: "cliente",
        },
      });
    } else {
      return res.status(400).json({ mensagem: "Esse usuario já esta em uso" });
    }

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// esse export serve para eu conseguir liberar as rotas e importar no index.ts
export default router;
