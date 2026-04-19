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
                const response = fetch("http://localhost:3000/loginUsuarios", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: nomeLogin,
                        senha: senhaLogin
                    })
                })
                    .then((dados) => dados.json())
                    .then((dados) => {
                    // Dados 
                    console.log(dados);
                    const idUser = response.then(dados.id);
                    // Salvando o ID do usuario no localStorage
                    localStorage.setItem('idUsuario', JSON.stringify(idUser));
                    // Retorno para o usuario se cadastrar
                    if (dados.mensagem === "Erro cadastre-se" && dados.status === 404) {
                        return alert("Erro cadastre-se");
                    }
                    //  Usuario ou senha invalidos  
                    if (dados.mensagem === "Usuario ou senha invalidos" && dados.status === 404) {
                        return alert("Usuario ou senha invalidos");
                    }
                    // Direcionando o usuario com base no role
                    if (dados.mensagem === "Logando com sua conta admin" && dados.status === 200) {
                        // Fazer o redirecionamento para conta admin
                        return alert("Entrando na conta admin");
                    }
                    else {
                        alert("Entrando na conta cliente");
                        window.location.replace('http://127.0.0.1:5500/frontend/src/features/usuarios%20secao/usuario.html');
                    }
                });
                // // Aqui esta estraindo o corpo da reposta
                // const dadosUsuario: UserLogin = await response.json()
                // // Aqui estão os dados
                // console.log(dadosUsuario);
                // if (response)
            }
            catch (error) {
                console.log(error);
                alert("Erro no servidor tente novamente mais tarde");
            }
        }
    }); // evento do btn
} // IF do fomulario 
