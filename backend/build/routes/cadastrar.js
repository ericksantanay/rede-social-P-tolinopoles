"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o criador de rotas separadas
const express_1 = require("express");
// Importando o prisma
const prisma_1 = __importDefault(require("../lib/prisma"));
// bcrypt (criptografando senhas)
const bcrypt_1 = __importDefault(require("bcrypt"));
// Isso cria um mini servidor de rotas
const router = (0, express_1.Router)();
// Rota de cadastro de usuarios
router.post("/cadastrarUsuarios", async (req, res) => {
    // pegando a requisição do corpo
    const { anoNascimento, nome, senha } = req.body;
    // verificando se o usuario se cadastrou pelo req
    if (!nome || !senha || !anoNascimento) {
        res.status(404).json("Erro cadastre-se!");
        return;
    }
    try {
        // Hash do bcrypt
        const salt = await bcrypt_1.default.genSalt(10); // um valor único que é misturado na senha antes do hash.
        const passwordHash = await bcrypt_1.default.hash(senha, salt); // senha criptografada
        // buscando o usuario
        const buscarUser = await prisma_1.default.usuariosPatolinopoles.findUnique({
            where: {
                nome: nome,
            },
        });
        // Verificando a IADADE do usuario
        let data = new Date();
        const anoAtual = data.getFullYear();
        const idadeAtual = (anoAtual - anoNascimento);
        if (idadeAtual < 18) {
            return res.status(403).json({ mensagem: "Idade nao permitida" });
        }
        // Se o usuario nao existir eu crio o usuario
        if (!buscarUser) {
            // criando o usuario
            await prisma_1.default.usuariosPatolinopoles.create({
                data: {
                    nome: nome,
                    senha: passwordHash,
                    anoNascimento: anoNascimento,
                    role: "cliente"
                },
            });
            // Mensagem de usuario criado com sucesso
            return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
        }
        else {
            return res.status(409).json({ mensagem: "Esse usuario já esta em uso" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
});
// esse export serve para eu conseguir liberar as rotas e importar no index.ts
exports.default = router;
