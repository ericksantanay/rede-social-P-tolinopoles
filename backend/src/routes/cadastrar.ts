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
  nome: string,
  senha: string,
  anoNascimento: number,
  role: string
}

// Rota de cadastro de usuarios
router.post("/cadastrarUsuarios", async (req: Request, res: Response) => {

  // pegando a requisição do corpo
  const { nome, senha, anoNascimento } = req.body;

  // verificando se o usuario se cadastrou pelo req
  if (!nome || !senha || !anoNascimento) {
    res.status(404).json("Erro cadastre-se!");
    return
  }

  
  try {

    // Hash do bcrypt
    const randomSalt = randomInt(10, 16) //
    const senhaCriptografada = await hash(senha, randomSalt) //

   
    // buscando o usuario
    const buscarUser = await prisma.usuariosPatolinopoles.findUnique({
      where: {
        nome: nome,
      },
    });

    if (!buscarUser) {

      let data =  new Date()

      const anoAtual = data.getFullYear()
      const idadeAtual = (anoAtual - anoNascimento)


      // Verificando a Idade 
      if (idadeAtual < 18) {

        res.status(403).json({mensagem: "Idade nao permitida"})
        return
      
      }else {

        // criandoo usuario
        await prisma.usuariosPatolinopoles.create({
          data: {
            nome: nome,
            senha: senhaCriptografada,
            anoNascimento: anoNascimento,
            role: "cliente",
          },
        });
      }

      
    } else {
      return res.status(409).json({ mensagem: "Esse usuario já esta em uso" });
    }

    // Mensagem de usuario criado com sucesso
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// esse export serve para eu conseguir liberar as rotas e importar no index.ts
export default router;
