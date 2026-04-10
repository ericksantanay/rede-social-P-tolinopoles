// importando o framework
import express from "express";

// Importando as minhas rotas
import cadastrarUser from "./routes/cadastrar";

// cria o server principal
const app = express();

app.use(express.json()); // Serve pra ler JSON do req.body


// conectando as rotas no servidor
app.use('routes/cadastrarUsuarios',cadastrarUser);


app.listen(3000, () => {
  console.log("Servidor rodando")
});