"use strict";
const tokenPerfil = JSON.parse(localStorage.getItem('idUsuario'));
// Saidas nome do usuario
const nomeUsuario = document.getElementById('nome-do-usuario');
let nomeUsuarioComArroba = document.getElementById('nome-com-arroba');
function renderizarNomePerfil() {
    try {
        fetch("http://localhost:3000/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${tokenPerfil ?? ""}`
            }
        })
            .then((res) => res.json())
            .then((dados) => {
            console.log(dados);
            nomeUsuario.innerText = dados.nome;
            let nomeUsuarioComArrobaComEspaco = `@${dados.nome}`;
            // Tirando o espaço
            let nomeUsuarioComArrobaSemEspaco = nomeUsuarioComArrobaComEspaco.replace(/\s+/g, "");
            // Mostrando o nome
            nomeUsuarioComArroba.innerText = nomeUsuarioComArrobaSemEspaco;
        });
    }
    catch (error) {
        alert("Erro no servidor");
        console.log(error);
        return;
    }
}
renderizarNomePerfil();
