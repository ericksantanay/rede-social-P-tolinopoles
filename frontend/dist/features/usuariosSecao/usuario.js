"use strict";
// TOKEN JWT
const token = JSON.parse(localStorage.getItem('idUsuario'));
// Saidas aonde vai ir o nome
const saidaNome = document.querySelector('.nome-usuario');
function carregarIndentidadeCliente() {
    // Verificando se existe
    if (saidaNome) {
        try {
            const API_URL = "https://rede-social-p-tolinopoles.onrender.com";
            fetch(`${API_URL}/login`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token ?? ""}`
                }
            })
                .then((res) => res.json())
                .then((dados) => {
                console.log(dados);
                saidaNome.innerText += dados.nome;
                // Token não autorizado
                if (dados.mensagem === "Token nao Autorizado" ||
                    dados.mensagem === "Erro, token esta invalido" ||
                    dados.mensagem === "Esse Token não existe") {
                    alert("Nao Autorizado");
                    window.location.replace('/src/features/login/login.html');
                    return;
                }
                // Se o role nao existir eu redireciono para o login
                if (!dados.role) {
                    alert("Faça Login");
                    window.location.replace('/src/features/login/login.html');
                    return;
                }
                // 
                if (dados.role !== "cliente") {
                    window.location.replace('/src/features/login/login.html');
                    return;
                }
            });
            // Final do try
        }
        catch (error) {
            console.log(error);
            alert("Erro no servidor tente novamente mais tarde");
            return;
        }
    }
}
carregarIndentidadeCliente();
