"use strict";
// formulario de login
const formularioLogin = document.getElementById('formulario-login');
const avisoInvalidos = document.getElementById('card-mensagem');
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
            const API_URL = "https://rede-social-p-tolinopoles.onrender.com";
            try {
                fetch(`${API_URL}/login`, {
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
                        let tempo1 = setTimeout(() => {
                            avisoInvalidos.style.display = 'block';
                        }, 100);
                        setTimeout(() => {
                            clearTimeout(tempo1);
                            avisoInvalidos.style.display = 'none';
                        }, 4000);
                        return;
                    }
                    // Direcionando o usuario com base no role
                    if (dados.mensagem === "Pagina Admin") {
                        window.location.replace('http://127.0.0.1:5500/frontend/src/features/admin/admin.html');
                        return;
                    }
                    if (dados.mensagem === "Pagina Cliente") {
                        window.location.replace('http://127.0.0.1:5500/frontend/src/features/usuariosSecao/usuario.html');
                        return;
                    }
                    else {
                        return alert("Erro no login");
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
