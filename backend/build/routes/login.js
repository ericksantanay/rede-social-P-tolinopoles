"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando o criador das rotas
const express_1 = require("express");
// bcrypt
const bcrypt_1 = __importDefault(require("bcrypt"));
// Importando o Prisma 
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const JtwNoEnv = process.env.JWT_PASS;
// mini servidor de rotas
const router = (0, express_1.Router)();
// ROTAS
// Rota Login
router.post("/login", async (req, res) => {
    // Requisição do corpo
    const { nome, senha } = req.body;
    // Verificando se os dados estão vindo do request
    if (!nome || !senha) {
        res.status(404).json({ mensagem: "Erro cadastre-se" });
        return;
    }
    try {
        // Buscando o usuario pelo nome
        const user = await prisma_1.default.usuariosPatolinopoles.findFirst({
            where: {
                nome: nome
            }
        });
        // Se usuario nao existir 
        if (!user) {
            return res.status(404).json({ mensagem: "Usuario ou senha invalidos" });
        }
        // comparando a senha com o bcrypt
        const passwordIsValid = await bcrypt_1.default.compare(senha, user.senha);
        // verificando a senha
        if (!passwordIsValid) {
            return res.status(404).json({ mensagem: "Usuario ou senha invalidos" });
        }
        //  Criando o token JTW
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '2h' });
        // Verificando se o role existe
        if (!user.role) {
            res.status(404).json({ mensagem: "Role não existe" });
            return;
        }
        // Aqui se o role for admin entra em uma pagina diferente do usuario
        if (user.role === "admin") {
            return res.status(200).json({ mensagem: "Pagina Admin", token: token, role: user.role });
        }
        else {
            return res.status(200).json({
                mensagem: "Pagina Cliente",
                token: token,
                role: user.role
            });
        }
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor tente novamente mais tarde" });
    }
});
// Rota para mostrar o nome
router.get('/login', async (req, res) => {
    // Buscando Pelo Token
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            return res.status(403).json({ mensagem: "Nao Autorizado" });
        }
        // Tranformando a string em um array e tirando o bearer do token 
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(404).json({ mensagem: "Esse Token não existe" });
            return;
        }
        // Verificando o Token
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS ?? '');
        // Buscando o id
        const user = await prisma_1.default.usuariosPatolinopoles.findUnique({
            where: {
                id: id
            }
        });
        // Verificando se o usuario é ele mesmo
        if (!user) {
            return res.status(403).json({ mensagem: "Token nao Autorizado" });
        }
        // Verificando se o role existe
        if (!user.role) {
            res.status(404).json({ mensagem: "Role não existe" });
        }
        // Se existir ele manda uma resposta de que o token foi verificado
        if (user) {
            return res.status(200).json({ mensagem: "Token verificado com sucesso",
                id: user.id,
                nome: user.nome,
                role: user.role
            });
        }
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro, token esta invalido" });
    }
});
// exportando 
exports.default = router;
