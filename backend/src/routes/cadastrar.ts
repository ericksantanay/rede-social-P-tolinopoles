// Importa o criador de rotas separadas
import { Router } from "express";

import { Request, Response } from "express";
// Importando o prisma
import prisma from "../lib/prisma";

// bcrypt (criptografando senhas)
import bcrypt from 'bcrypt'


// Isso cria um mini servidor de rotas
const router = Router();

// Rota de cadastro de usuarios
router.post("/cadastrarUsuarios", async (req: Request, res: Response) => {

  // pegando a requisição do corpo
  const { anoNascimento, nome, senha } = req.body;

  // verificando se o usuario se cadastrou pelo req
  if (!nome || !senha || !anoNascimento) {
    res.status(404).json("Erro cadastre-se!");
    return
  }

  
  try {

    // Hash do bcrypt
    const salt = await bcrypt.genSalt(10) // um valor único que é misturado na senha antes do hash.
    const passwordHash = await bcrypt.hash(senha, salt) // senha criptografada

   
    // buscando o usuario
    const buscarUser = await prisma.usuariosPatolinopoles.findUnique({
      where: {
        nome: nome,
      },
    });

    // Verificando a IADADE do usuario
    let data =  new Date()

    const anoAtual = data.getFullYear()
      const idadeAtual = (anoAtual - anoNascimento)

        if (idadeAtual < 18) {
          return res.status(403).json({mensagem: "Idade nao permitida"})
        }

    // Se o usuario nao existir eu crio o usuario
    if (!buscarUser) {

        // criando o usuario
        await prisma.usuariosPatolinopoles.create({
          data: {
            nome: nome,
            senha: passwordHash,
            anoNascimento: anoNascimento,
            role: "cliente",
          },
        });

        // Mensagem de usuario criado com sucesso
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
      
    } else {
      return res.status(409).json({ mensagem: "Esse usuario já esta em uso" });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// esse export serve para eu conseguir liberar as rotas e importar no index.ts
export default router;
