"use strict";
// formulario de login
const formularioLogin = document.getElementById('formulario-login');
if (formularioLogin) {
    // evento do formulario
    formularioLogin.addEventListener('submit', async function (previnirLogin) {
        let nome = document.querySelector('#nome');
        let senha = document.querySelector('#senha');
        // Verificando se nao esta vindo como nulo
        if (nome instanceof HTMLInputElement && senha instanceof HTMLInputElement) {
            previnirLogin.preventDefault();
            // Inputs
            const nomeLogin = nome.value;
            const senhaLogin = senha.value;
            // Verificando se os campos estão preenchidos
            if (nomeLogin.trim() === '' || senhaLogin.trim() === '') {
                return alert("Preencha os campos corretamente");
            }
            try {
                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: nomeLogin,
                        senha: senhaLogin
                    })
                })
                    .then((res) => res.json())
                    .then((dados) => {
                    // Dados 
                    console.log(dados);
                    // Salvando o ID do usuario no localStorage
                    localStorage.setItem('idUsuario', JSON.stringify(dados.token));
                    // Retorno para o usuario se cadastrar
                    if (dados.mensagem === "Erro cadastre-se") {
                        return alert("Erro cadastre-se");
                    }
                    //  Usuario ou senha invalidos  
                    if (dados.mensagem === "Usuario ou senha invalidos") {
                        return alert("Usuario ou senha invalidos");
                    }
                    // Direcionando o usuario com base no role
                    if (dados.mensagem === "Logando com sua conta admin") {
                        return alert("Entrando na conta admin");
                    }
                    else if (dados.mensagem === "Usuario encontrado com sucesso") {
                        alert("Entrando na conta cliente");
                        window.location.replace('http://127.0.0.1:5500/frontend/src/features/usuariosSecao/usuario.html');
                        return;
                    }
                    else {
                        alert("Erro no login");
                    }
                });
            }
            catch (error) {
                console.log(error);
                alert("Erro no servidor tente novamente mais tarde");
            }
        }
    }); // evento do btn
} // IF do fomulario 
