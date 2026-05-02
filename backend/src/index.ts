// importando o framework
import express from "express"

// importando o cors
import cors from "cors";

// Importando as minhas rotas
import cadastrarUser from "./routes/cadastrar";

import Login from "./routes/login";

import postagem from "./routes/postagem";

import biografia from "./routes/biografia";

// import buscarUser from "./routes/pesquisaUser";


// cria o server principal
const app = express()

app.use(express.json()) // Serve pra ler JSON do req.body

app.use(express.urlencoded({ extended: true})) // Aqui ele esta lendo formularios


// cors
app.use(cors()); // Depois colocar só as URLS que serão permitidas


import "dotenv/config";

// conectando as rotas no servidor
app.use(cadastrarUser);
app.use(Login);
app.use(postagem);
app.use(biografia);
// app.use(buscarUser);




app.listen(3000, () => {
  console.log("Servidor rodando")
});