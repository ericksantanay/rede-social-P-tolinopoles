// importando o framework
import express from "express"

// importando o cors
import cors from "cors";

// Importando as minhas rotas
import cadastrarUser from "./routes/cadastrar"

// cria o server principal
const app = express()

app.use(express.json()) // Serve pra ler JSON do req.body

app.use(express.urlencoded({ extended: true})) // Aqui ele esta lendo formularios


// cors
app.use(cors());


import "dotenv/config";

// conectando as rotas no servidor
app.use(cadastrarUser);


app.listen(3000, () => {
  console.log("Servidor rodando")
});