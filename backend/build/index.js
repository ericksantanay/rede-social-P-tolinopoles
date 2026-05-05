"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importando o framework
const express_1 = __importDefault(require("express"));
// importando o cors
const cors_1 = __importDefault(require("cors"));
// Importando as minhas rotas
const cadastrar_1 = __importDefault(require("./routes/cadastrar"));
const login_1 = __importDefault(require("./routes/login"));
const postagem_1 = __importDefault(require("./routes/postagem"));
const biografia_1 = __importDefault(require("./routes/biografia"));
require("dotenv/config");
// cria o server principal
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Serve pra ler JSON do req.body
app.use(express_1.default.urlencoded({ extended: true })); // Aqui ele esta lendo formularios
// cors
app.use((0, cors_1.default)()); // Depois colocar só as URLS que serão permitidas
// conectando as rotas no servidor
app.use(cadastrar_1.default);
app.use(login_1.default);
app.use(postagem_1.default);
app.use(biografia_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando");
});
