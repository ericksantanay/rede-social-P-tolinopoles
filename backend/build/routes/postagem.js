"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/postagem', async (req, res) => {
    const { postagem } = req.body;
    const { authorization } = req.headers;
    if (!postagem) {
        return res.status(400).json({ mensagem: "Postagem não existe" });
    }
    if (!authorization) {
        return res.status(403).json({ mensagem: "Sem token" });
    }
    try {
        const token = authorization.split(' ')[1];
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
        await prisma_1.default.postagemUser.create({
            data: {
                postagem: postagem,
                userId: id
            }
        });
        return res.status(201).json({ mensagem: "Postagem criada com sucesso" });
    }
    catch (error) {
        console.log("Vamos ver o erro que esta acontecendo" + error);
        return res.status(403).json({ mensagem: "Token inválido" });
    }
});
router.get('/postagem', async (req, res) => {
    try {
        const posts = await prisma_1.default.postagemUser.findMany({
            include: {
                usuario: true
            }
        });
        const resultado = posts.map(post => ({
            postagem: post.postagem,
            nome: post.usuario?.nome
        }));
        return res.status(200).json(resultado);
    }
    catch (error) {
        console.log("ERRO NO BACKEND:", error);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
});
// exportando
exports.default = router;
