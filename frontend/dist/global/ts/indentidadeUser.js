"use strict";
/* Objetivo: Aqui eu vou pegar o token JWT do localstorage e verificar se é realmente o usuario  se for eu carrego os dados se não da erro*/
// TOKEN JWT
// Saidas aonde vai ir o nome
const saidaNome = document.querySelector('.nome-usuario');
function carregarIndentidadeUser() {
    const token = localStorage.getItem('idUsuario');
    // Verificando se existe
    if (saidaNome) {
        try {
            fetch("http://localhost:3000/login", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token ?? ""}`
                }
            })
                .then((res) => res.json())
                .then((dados) => {
                console.log(dados);
                if (dados.mensagem === "Nao Autorizado") {
                    return alert("Nao Autorizado");
                }
                if (dados.mensagem === "Token verificado") {
                    saidaNome.innerText = dados.nome;
                }
            });
            // Final do try
        }
        catch (error) {
            console.log(error);
            return alert("Erro no servidor");
        }
    }
}
carregarIndentidadeUser();
