"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/biografiaRouter', async (req, res) => {
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
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
        await prisma_1.default.biografiaUsuario.upsert({
            where: { userId: id },
            update: { biografia: biografia },
            create: {
                biografia: biografia,
                userId: id
            }
        });
        return res.status(201).json({ mensagem: "Biografia Criada com sucesso" });
    }
    catch (error) {
        console.log("Vamos ver o erro que esta acontecendo" + error);
        return res.status(403).json({ mensagem: "Token inválido" });
    }
    ;
});
// Rota para carregar a biografia
router.get('/biografiaRouter', async (req, res) => {
    const { authorization } = req.headers;
    // 1. Verifica se tem token
    if (!authorization) {
        return res.status(403).json({ mensagem: "Sem token" });
    }
    try {
        // 2. Extrai o token
        const token = authorization.split(' ')[1];
        // 3. Verifica o token
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
        // 4. Busca a biografia do usuário
        const bio = await prisma_1.default.biografiaUsuario.findUnique({
            where: { userId: id }
        });
        // 5. Retorno
        return res.status(200).json(bio);
    }
    catch (error) {
        console.log("Erro no GET biografia:", error);
        return res.status(403).json({ mensagem: "Token inválido" });
    }
});
exports.default = router;
